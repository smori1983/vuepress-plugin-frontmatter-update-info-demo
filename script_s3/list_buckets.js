const clientConfig = require('./config.local').clientConfig;
const {
  S3Client,
  ListBucketsCommand,
} = require('@aws-sdk/client-s3');

const client = new S3Client(clientConfig);

(async () => {
  const listBucketsCommand = new ListBucketsCommand({});
  const response = await client.send(listBucketsCommand);
  console.log(response);
})();
