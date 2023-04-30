const fs = require('fs');
const path = require('path');

const localConfigFile = path.resolve(__dirname, 'config.local.js');

module.exports.get = () => {
  if (fs.existsSync(localConfigFile)) {
    const localConfig = require(localConfigFile);

    return {
      s3Config: localConfig.s3,
      s3ObjectKey: 'vuepress-plugin-frontmatter-update-info.demo.slack.local.json',
      slackConfig: localConfig.slack,
    };
  }

  if (process.env.S3_CONFIGURED && process.env.SLACK_CONFIGURED) {
    return {
      s3Config: {
        clientConfig: {
          region: process.env.S3_REGION,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
          },
        },
        bucket: process.env.S3_BUCKET,
      },
      s3ObjectKey: 'vuepress-plugin-frontmatter-update-info.demo.slack.gh.json',
      slackConfig: {
        token: process.env.SLACK_TOKEN,
        channel_id: process.env.SLACK_CHANNEL_ID,
        site_base_path: process.env.SLACK_SITE_BASE_PATH,
      },
    };
  }

  return {
    s3Config: null,
    s3ObjectKey: null,
    slackConfig: null,
  };
};
