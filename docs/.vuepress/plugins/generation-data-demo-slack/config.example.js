module.exports = {
  s3: {
    clientConfig: {
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
        secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      },
    },
    bucket: 'XXXXXXXXXX',
  },
  slack: {
    token: 'xoxb-XXXXXXXXXXXXX-XXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXX',
    channel_id: 'XXXXXXXXXXX',
    site_base_path: 'https://example.com/',
  },
};
