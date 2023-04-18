const {
  clientConfig,
  targetBucket,
  objectKey,
} = require('./config.local');
const {
  S3Client,
} = require('@aws-sdk/client-s3');
const s3 = require('./s3');
const Generation = require('./generation');
const GenerationDiffDate = require('./generation-diff-date');
const GenerationDiffDateDescription = require('./generation-diff-date-description');

(async () => {
  const client = new S3Client(clientConfig);

  try {
    const json = await s3.getObject(client, targetBucket, objectKey);
    const data = JSON.parse(json);

    const generation0 = new Generation(data.generation_0);
    const generation1 = new Generation(data.generation_1);

    console.log(JSON.stringify(new GenerationDiffDate().get(generation0, generation1), null, 2));
    console.log(JSON.stringify(new GenerationDiffDateDescription().get(generation0, generation1), null, 2));
  } catch (e) {
    console.log(e);
  }

  client.destroy();
})();
