const {
  clientConfig,
  targetBucket,
  objectKey,
} = require('./config.local');
const {
  S3Client,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const {
  difference,
  differenceBy,
  intersection,
  orderBy,
} = require('lodash');
const hash = require('hash-sum');

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

  try {
    const json = await getObject(client, targetBucket, objectKey);
    console.log(JSON.stringify(getDiff(json), null, 2));
  } catch (e) {
    console.log(e);
  }

  client.destroy();
})();

/**
 * @param {string} json
 * @return {Object[]}
 */
const getDiff = (json) => {
  const data = JSON.parse(json);
  const target = differenceBy(data.generation_0, data.generation_1, (page) => {
    return `${page.path}:${page.recordsHash}`;
  });

  const result = [];

  target.forEach((generation0Page) => {
    const generation1Page = findPage(data.generation_1, generation0Page);

    if (generation1Page) {
      const generation0DateList = extractDate(generation0Page);
      const generation1DateList = extractDate(generation1Page);

      const newDateList = difference(generation0DateList, generation1DateList);
      const existingDateList = intersection(generation0DateList, generation1DateList);

      const targetRecords = [];

      generation0Page.records.forEach((record) => {
        if (newDateList.includes(record.date)) {
          targetRecords.push(record);
        } else if (existingDateList.includes(record.date)) {
          const generation1Record = getRecord(generation1Page, record.date);

          if (hash(record) !== hash(generation1Record)) {
            targetRecords.push(record);
          }
        }
      });

      if (targetRecords.length > 0) {
        result.push({
          path: generation0Page.path,
          title: generation0Page.title,
          records: targetRecords,
        });
      }
    } else {
      result.push({
        path: generation0Page.path,
        title: generation0Page.title,
        records: generation0Page.records,
      });
    }
  });

  return result;
};

/**
 * @param {Object[]} generationData
 * @param {Object} page
 * @return {(Object|undefined)}
 */
const findPage = (generationData, page) => {
  return generationData.find((p) => {
    return p.path === page.path;
  });
};

/**
 * @param {Object} page
 * @return {string[]}
 */
const extractDate = (page) => {
  const dateList = page.records.map((record) => record.date);

  return orderBy(dateList);
};

/**
 * @param {Object} page
 * @param {string} date
 * @return {Object}
 */
const getRecord = (page, date) => {
  return page.records.find((record) => {
    return record.date === date;
  });
};
