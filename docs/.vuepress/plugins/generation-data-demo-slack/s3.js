/**
 * @typedef {import('@aws-sdk/client-s3').S3ClientConfig} S3ClientConfig
 * @typedef {import('@aws-sdk/client-s3').GetObjectCommandOutput} GetObjectCommandOutput
 */

const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

/**
 * S3 handler for the specific purpose.
 *
 * Thanks:
 * https://stackoverflow.com/questions/36942442/how-to-get-response-from-s3-getobject-in-node-js#36944450
 */
class S3 {
  /**
   * @param {S3ClientConfig} config
   * @param {string} bucket
   * @param {string} key
   */
  constructor(config, bucket, key) {
    /**
     * @type {S3Client}
     * @private
     */
    this._client = new S3Client(config);

    /**
     * @type {string}
     * @private
     */
    this._bucket = bucket;

    /**
     * @type {string}
     * @private
     */
    this._key = key;
  }

  destroy() {
    this._client.destroy();
  }

  /**
   * @return {Promise<string>}
   */
  async get() {
    const command = new GetObjectCommand({
      Bucket: this._bucket,
      Key: this._key,
    });

    const main = async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await this._client.send(command);

          const chunks = [];

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
  }

  /**
   * @param {string} data
   * @return {Promise<void>}
   */
  async put(data) {
    const command = new PutObjectCommand({
      Body: data,
      Bucket: this._bucket,
      ContentType: 'application/json',
      Key: this._key,
    });

    await this._client.send(command);
  }
}

module.exports = S3;
