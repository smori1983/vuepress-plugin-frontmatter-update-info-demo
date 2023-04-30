/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');
const hook = require('vuepress-plugin-frontmatter-update-info/src/hook');
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const config = require('./config');

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
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
  clientDynamicModules() {
    return {
      name: 'generation-data-demo-s3/data.js',
      content: `export default ${JSON.stringify(data, null, 2)}`,
    };
  },
});

const {
  s3Config,
  s3ObjectKey,
} = config.get();

hook.addReadyCallback(async (updates) => {
  if (s3Config === null) {
    return;
  }

  await processS3(updates);
});

/**
 * Handle Amazon S3.
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

  data = {
    generation_0,
    generation_1,
  };

  await putObject(client, s3Config.bucket, s3ObjectKey, JSON.stringify(data, null, 2));

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
