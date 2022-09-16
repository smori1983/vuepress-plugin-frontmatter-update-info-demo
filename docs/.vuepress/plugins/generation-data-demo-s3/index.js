/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

let data = {
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
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js'),
  ],
  clientDynamicModules() {
    return {
      name: 'generation-data-demo-s3/data.js',
      content: `export default ${JSON.stringify(data, null, 2)}`,
    };
  },
});

const fs = require('fs');
const path = require('path');
const hook = require('vuepress-plugin-frontmatter-update-info/src/hook');
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

let s3Config = null;
let s3ObjectKey = null;

const localConfigFile = path.resolve(__dirname, 'config.local.js');
if (fs.existsSync(localConfigFile)) {
  s3Config = require(localConfigFile);
  s3ObjectKey = 'vuepress-plugin-frontmatter-update-info.demo.s3.local.json';
} else if (process.env.S3_CONFIGURED) {
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
  s3ObjectKey = 'vuepress-plugin-frontmatter-update-info.demo.s3.gh.json';
}

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

        let chunks = [];

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

hook.addReadyCallback(async (updates) => {
  if (s3Config === null) {
    return;
  }

  const client = new S3Client(s3Config.clientConfig);

  const savedData = await getObject(client, s3Config.bucket, s3ObjectKey);
  const savedJson = JSON.parse(savedData);

  let generation_0 = updates;
  let generation_1 = savedJson.generation_0 || [];

  data = {
    generation_0,
    generation_1,
  };

  await putObject(client, s3Config.bucket, s3ObjectKey, JSON.stringify(data, null, 2));

  client.destroy();
});
