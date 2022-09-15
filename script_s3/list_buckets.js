const config = require('./config.local');
const {
  S3Client,
  ListBucketsCommand,
} = require('@aws-sdk/client-s3');

const client = new S3Client(config);

(async () => {
  const listBucketsCommand = new ListBucketsCommand({});
  const response = await client.send(listBucketsCommand);
  console.log(response);
})();
