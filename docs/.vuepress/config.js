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
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
