const {
  clientConfig,
  targetBucket,
  objectKey,
} = require('./config.local');
const {
  S3Client,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const jsonData = {
  date: new Date().toUTCString(),
  list: ['a', 'b', 'c'],
};

const client = new S3Client(clientConfig);

(async () => {
  const command = new PutObjectCommand({
    Body: JSON.stringify(jsonData, null, 2),
    Bucket: targetBucket,
    ContentType: 'application/json',
    Key: objectKey,
  });
  const response = await client.send(command);
  console.log(response);
})();
