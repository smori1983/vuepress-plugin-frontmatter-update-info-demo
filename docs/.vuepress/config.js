module.exports = {
  base: '/vuepress-plugin-frontmatter-update-info-demo/',
  title: 'vuepress-plugin-frontmatter-update-info',
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    search: false,
    nav: [
      { text: 'GitHub', link: 'https://github.com/smori1983/vuepress-plugin-frontmatter-update-info-demo' },
    ],
    sidebar: [
      {
        title: 'Main',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/update_info_table_excerpt.md',
          '/update_info_table.md',
          '/update_info_list_excerpt.md',
          '/update_info_list.md',
          '/debug.md',
        ],
      },
      {
        title: 'Generation data (S3)',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/generation_data_s3/intro.md',
          '/generation_data_s3/demo.md',
        ],
      },
      {
        title: 'Generation data (S3 + Slack)',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/generation_data_slack/intro.md',
          '/generation_data_slack/demo.md',
        ],
      },
      {
        title: 'Pages: basic',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/pages/basic_01.md',
          '/pages/basic_02.md',
          '/pages/basic_03.md',
          '/pages/basic_04.md',
          '/pages/basic_05.md',
        ],
      },
      {
        title: 'Pages: custom tag',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/pages/custom_tag_01.md',
          '/pages/custom_tag_02.md',
          '/pages/custom_tag_03.md',
        ],
      },
      {
        title: 'Pages: invalid',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/pages/invalid_01.md',
          '/pages/invalid_02.md',
          '/pages/invalid_03.md',
          '/pages/invalid_04.md',
          '/pages/invalid_05.md',
          '/pages/invalid_06.md',
          '/pages/invalid_07.md',
        ],
      },
    ],
  },

  plugins: [
    [require('./plugins/generation-data-demo-s3')],
    [require('./plugins/generation-data-demo-slack')],

    ['frontmatter-update-info', {
      pageEmbed: true,
    }],

    ['view-source'],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
