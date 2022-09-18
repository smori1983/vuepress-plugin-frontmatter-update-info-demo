/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const fs = require('fs');
const path = require('path');
const hook = require('vuepress-plugin-frontmatter-update-info/src/hook');
const S3 = require('./s3');
const Slack = require('./slack');

let generationData = {
  generation_0: [],
  generation_1: [],
};

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => ({
  name: 'generation-data-demo-slack',
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
  const s3 = new S3(s3Config.clientConfig, s3Config.bucket, s3ObjectKey);

  const savedData = JSON.parse(await s3.get());

  // Rotate the generation data.
  const generation_0 = updates;
  const generation_1 = savedData.generation_0 || [];

  generationData = {
    generation_0,
    generation_1,
  };

  await s3.put(JSON.stringify(generationData, null, 2));

  s3.destroy();
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

  const slack = new Slack(slackConfig.token, slackConfig.channel_id);
  await slack.postMessage(textLines.join('\n'));
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
