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
  generation_0: ['data1', 'data2', 'data3'],
  generation_1: ['data4', 'data5', 'data6'],
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
