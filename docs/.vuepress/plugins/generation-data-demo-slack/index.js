/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const { orderBy } = require('lodash');
const hook = require('vuepress-plugin-frontmatter-update-info/src/hook');
const {
  Generation,
  DiffStyleDate,
} = require('vuepress-plugin-frontmatter-update-info/src/generation-util');
const config = require('./config');
const S3 = require('./s3');
const Slack = require('./slack');

let generationData = {
  generation_0: [],
  generation_1: [],
};

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => ({
  name: 'generation-data-demo-slack',
  plugins: [
    ['vuepress-plugin-frontmatter-update-info'],
  ],
});

const {
  s3Config,
  s3ObjectKey,
  slackConfig,
} = config.get();

hook.addGeneratedCallback(async (updates) => {
  if (s3Config === null || slackConfig === null) {
    return;
  }

  await processS3(updates);
  await processSlack();
});

/**
 * Handle Amazon S3 object.
 *
 * @param {Object[]} updates
 * @return {Promise<void>}
 */
const processS3 = async (updates) => {
  const s3 = new S3(s3Config.clientConfig, s3Config.bucket, s3ObjectKey);

  const savedData = JSON.parse(await s3.get());

  // Rotate the generation data.
  const generation_0 = updates;
  const generation_1 = savedData.generation_0 || [];

  generationData = {
    generation_0,
    generation_1,
  };

  await s3.put(JSON.stringify(generationData, null, 2));

  s3.destroy();
};

/**
 * Send Slack message.
 *
 * @return {Promise<void>}
 */
const processSlack = async () => {
  const targetPages = extractTargetPages();

  if (targetPages.length === 0) {
    return;
  }

  const textLines = [];

  textLines.push(`*Update info: ${new Date().toLocaleString()}*`);
  textLines.push('');
  targetPages.forEach((page) => {
    textLines.push(`■ ${page.title}`);
    textLines.push(pageUrl(page.path));
    page.records.forEach((record) => {
      textLines.push(record.date);
      record.description.forEach((description) => {
        textLines.push(`- ${description}`);
      });
    });
    textLines.push('');
  });

  const slack = new Slack(slackConfig.token, slackConfig.channel_id);
  await slack.postMessage(textLines.join('\n'));
};

/**
 * Extract pages for notification.
 *
 * @return {Object[]}
 */
const extractTargetPages = () => {
  const generation0 = new Generation(generationData.generation_0);
  const generation1 = new Generation(generationData.generation_1);
  const targetPages = new DiffStyleDate().get(generation0, generation1);

  return orderBy(targetPages, ['title'], ['asc']);
};

/**
 * @param {string} pagePath
 * @return {string}
 */
const pageUrl = (pagePath) => {
  const basePath = slackConfig.site_base_path.replace(/\/$/, '');

  return `${basePath}${pagePath}`;
};
