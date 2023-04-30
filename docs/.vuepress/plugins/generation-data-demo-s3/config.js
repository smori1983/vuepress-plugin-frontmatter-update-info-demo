const fs = require('fs');
const path = require('path');

const localConfigFile = path.resolve(__dirname, 'config.local.js');

module.exports.get = () => {
  if (fs.existsSync(localConfigFile)) {
    return {
      s3Config: require(localConfigFile),
      s3ObjectKey: 'vuepress-plugin-frontmatter-update-info.demo.s3.local.json',
    };
  }

  if (process.env.S3_CONFIGURED) {
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
      s3ObjectKey: 'vuepress-plugin-frontmatter-update-info.demo.s3.gh.json',
    };
  }

  return {
    s3Config: null,
    s3ObjectKey: null,
  };
};


