module.exports = {
  base: '/vuepress-plugin-frontmatter-update-info-demo/',
  title: 'vuepress-plugin-frontmatter-update-info',
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
    ],
  },

  plugins: [
    ['@vuepress/back-to-top'],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
