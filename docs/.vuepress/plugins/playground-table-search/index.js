/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => ({
  name: 'playground-table-search',
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js'),
  ],
  clientDynamicModules() {
    const data = [];

    for (let i = 0; i < 50; i++) {
      data.push({
        date: date(),
        title: title(),
        memo: memo(),
      });
    }

    return [
      {
        name: 'plugin-playground-table-search/data.js',
        content: `export default ${JSON.stringify(data, null, 2)}`,
      },
    ];
  },
});

const date = () => {
  const dates = [
    '2022/01/10',
    '2022/01/13',
    '2022/01/23',
    '2022/01/31',
    '2022/02/05',
    '2022/02/19',
  ];

  return random(dates);
};

const title = () => {
  const titles = [
    'project A',
    'project B',
    'project C',
    'project D',
    'project E',
  ];

  return random(titles);
};

const memo = () => {
  const memos = [
    'Lorem ipsum dolor sit amet.',
    'Consectetur adipiscing elit.',
    'Pulvinar proin gravida hendrerit',
    'Tincidunt lobortis feugiat vivamus',
    'Morbi tincidunt ornare massa eget',
  ];

  return random(memos);
};

/**
 * @param {string[]} list
 * @returns {string}
 */
const random = (list) => {
  const index = Math.floor(Math.random() * list.length);

  return list[index];
};
