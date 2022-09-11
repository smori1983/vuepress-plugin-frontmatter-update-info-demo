module.exports = {
  base: '/vuepress-plugin-frontmatter-update-info-demo/',
  title: 'vuepress-plugin-frontmatter-update-info',
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
      {
        title: 'Debug',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/debug/update_info.md',
        ],
      },
      {
        title: 'Demo',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/demo/update_info.md',
        ],
      },
      {
        title: 'Update info pages',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/update_info/page01.md',
          '/update_info/page02.md',
          '/update_info/page03.md',
        ],
      },
    ],
  },

  plugins: [
    ['@vuepress/back-to-top'],

    ['frontmatter-update-info', {
      pageEmbed: true,
    }],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
