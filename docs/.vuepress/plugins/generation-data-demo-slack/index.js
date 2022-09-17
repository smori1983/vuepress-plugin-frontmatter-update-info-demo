/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const fs = require('fs');
const path = require('path');
const hook = require('vuepress-plugin-frontmatter-update-info/src/hook');
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const { WebClient } = require('@slack/web-api');

let generationData = {
  generation_0: [],
  generation_1: [],
};

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => ({
  name: 'generation-data-demo-s3',
  plugins: [
    ['vuepress-plugin-frontmatter-update-info'],
  ],
});

let s3Config = null;
let s3ObjectKey = null;
let slackConfig = null;

const localConfigFile = path.resolve(__dirname, 'config.local.js');
if (fs.existsSync(localConfigFile)) {
  const localConfig = require(localConfigFile);
  s3Config = localConfig.s3;
  s3ObjectKey = 'vuepress-plugin-frontmatter-update-info.demo.slack.local.json';
  slackConfig = localConfig.slack;
} else if (process.env.S3_CONFIGURED && process.env.SLACK_CONFIGURED) {
  s3Config = {
    clientConfig: {
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    },
    bucket: process.env.S3_BUCKET,
  };
  s3ObjectKey = 'vuepress-plugin-frontmatter-update-info.demo.slack.gh.json';
  slackConfig = {
    token: process.env.SLACK_TOKEN,
    channel_id: process.env.SLACK_CHANNEL_ID,
    site_base_path: process.env.SLACK_SITE_BASE_PATH,
  };
}

hook.addGeneratedCallback(async (updates) => {
  if (s3Config === null || slackConfig === null) {
    return;
  }

  await processS3(updates);
  await processSlack();
});

/**
 * Handle Amazon S3 object.
 *
 * @param {Object[]} updates
 * @return {Promise<void>}
 */
const processS3 = async (updates) => {
  const client = new S3Client(s3Config.clientConfig);

  const savedData = await getObject(client, s3Config.bucket, s3ObjectKey);
  const savedJson = JSON.parse(savedData);

  const generation_0 = updates;
  const generation_1 = savedJson.generation_0 || [];

  generationData = {
    generation_0,
    generation_1,
  };

  await putObject(client, s3Config.bucket, s3ObjectKey, JSON.stringify(generationData, null, 2));

  client.destroy();
};

/**
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @return {Promise<string>}
 *
 * Thanks:
 * https://stackoverflow.com/questions/36942442/how-to-get-response-from-s3-getobject-in-node-js#36944450
 */
const getObject = async (client, bucket, key) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const main = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await client.send(command);
        const chunks = [];

        response.Body.once('error', (e) => reject(e));
        response.Body.on('data', (chunk) => chunks.push(chunk));
        response.Body.once('end', () => resolve(chunks.join('')));
      } catch (e) {
        return reject(e);
      }
    });
  };

  try {
    return await main();
  } catch (e) {
    // This is also for the case when S3 object not created yet.
    return '[]';
  }
};

/**
 * @param {S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @param {string} generationData
 * @return {Promise<void>}
 */
const putObject = async (client, bucket, key, generationData) => {
  const command = new PutObjectCommand({
    Body: generationData,
    Bucket: bucket,
    ContentType: 'application/json',
    Key: key,
  });

  await client.send(command);
};

/**
 * Send Slack message.
 *
 * @return {Promise<void>}
 */
const processSlack = async () => {
  const targetPages = extractTargetPages();

  if (targetPages.length === 0) {
    return;
  }

  const textLines = [];

  textLines.push(`*Update info: ${new Date().toLocaleString()}*`);
  textLines.push('');
  targetPages.forEach((page) => {
    textLines.push(`■ ${page.title}`);
    textLines.push(pageUrl(page.path));
    page.records.forEach((record) => {
      textLines.push(record.date);
      record.description.forEach((description) => {
        textLines.push(`- ${description}`);
      });
    });
    textLines.push('');
  });

  const web = new WebClient(slackConfig.token);

  await web.chat.postMessage({
    channel: slackConfig.channel_id,
    text: textLines.join('\n'),
  });
};

/**
 * @return {Object[]}
 */
const extractTargetPages = () => {
  const generation0Paths = generationData.generation_0.map(page => page.path);
  const generation1Paths = generationData.generation_1.map(page => page.path);

  const newPaths = generation0Paths.filter((path) => !generation1Paths.includes(path));
  const existingPaths = generation0Paths.filter((path) => generation1Paths.includes(path));

  const targetPages = [];

  newPaths.forEach((path) => {
    targetPages.push(findPageByPath(generationData.generation_0, path));
  })

  existingPaths.forEach((path) => {
    const generation0Page = findPageByPath(generationData.generation_0, path);
    const generation1Page = findPageByPath(generationData.generation_1, path);

    if (generation0Page.recordsHash !== generation1Page.recordsHash) {
      targetPages.push(generation0Page);
    }
  });

  return targetPages;
};

/**
 * @param {Object[]} pages
 * @param {string} path
 * @return {Object}
 */
const findPageByPath = (pages, path) => {
  return pages.find(page => page.path === path);
};

/**
 * @param {string} pagePath
 * @return {string}
 */
const pageUrl = (pagePath) => {
  const basePath = slackConfig.site_base_path.replace(/\/$/, '');

  return `${basePath}${pagePath}`;
};
