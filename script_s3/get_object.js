const {
  clientConfig,
  targetBucket,
  objectKey,
} = require('./config.local');
const {
  S3Client,
} = require('@aws-sdk/client-s3');
const s3 = require('./s3');

(async () => {
  const client = new S3Client(clientConfig);

  try {
    const json = await s3.getObject(client, targetBucket, objectKey);
    console.log(json);
  } catch (e) {
    console.log(e);
  }

  client.destroy();
})();
