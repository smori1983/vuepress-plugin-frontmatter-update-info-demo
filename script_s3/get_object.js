const {
  clientConfig,
  targetBucket,
  objectKey,
} = require('./config.local');
const {
  S3Client,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');

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
  const getCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.send(getCommand);

      let responseDataChunks = [];

      response.Body.once('error', (err) => reject(err));
      response.Body.on('data', (chunk) => responseDataChunks.push(chunk));
      response.Body.once('end', () => resolve(responseDataChunks.join('')));
    } catch (err) {
      return reject(err);
    }
  });
};

(async () => {
  const client = new S3Client(clientConfig);
  const json = await getObject(client, targetBucket, objectKey);
  console.log(json);
})();
