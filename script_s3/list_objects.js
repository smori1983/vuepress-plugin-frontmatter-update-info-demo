const {
  clientConfig,
  targetBucket,
} = require('./config.local');
const {
  S3Client,
  ListObjectsCommand,
} = require('@aws-sdk/client-s3');

const client = new S3Client(clientConfig);

(async () => {
  const command = new ListObjectsCommand({
    Bucket: targetBucket,
  });
  const response = await client.send(command);
  console.log(response);
})();
