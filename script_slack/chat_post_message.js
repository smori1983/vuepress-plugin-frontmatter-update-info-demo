const config = require('./config.local');
const { WebClient } = require('@slack/web-api');

/**
 * @param {string} pagePath
 * @return {string}
 */
const pageUrl = (pagePath) => {
  const basePath = config.site_base_path.replace(/\/$/, '');

  return `${basePath}${pagePath}`;
};

const web = new WebClient(config.token);

const text = `
*Update info: ${new Date().toLocaleString()}*

Basic 01
${pageUrl('/pages/basic_01.html')}
2022/07/01
- Update text for 2022/07/01.
2022/07/11
- Update text for 2022/07/11.
----------
Basic 02
${pageUrl('/pages/basic_02.html')}
2022/07/12
- Update text for 2022/07/12.
2022/07/02
- Update text for 2022/07/02.
`;

(async () => {
  const result = await web.chat.postMessage({
    channel: config.channel_id,
    text: text,
  });

  console.log(result);
})();
