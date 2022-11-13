---
home: false
---
# Demo site

Demo site for [vuepress-plugin-frontmatter-update-info](https://www.npmjs.com/package/vuepress-plugin-frontmatter-update-info).


## Config

`.vuepress/config.js`

```js
module.exports = {
  plugins: [
    // Local plugins for demo.
    // It is implemented to use vuepress-plugin-frontmatter-update-info plugin.
    [require('./plugins/generation-data-demo-s3')],
    [require('./plugins/generation-data-demo-slack')],

    // Define later to get this option applied.
    ['frontmatter-update-info', {
      pageEmbed: true,
    }],
  ],
};
```


## Contents

### Main

Main pages are using components provided by default.
If the page layout is enough, you can immediately provide update info page.

### Generation data

Simple examples to store frontmatter data by lifecycle hook callbacks and compose generation data.

### Pages

Markdown files to explain frontmatter description patterns.
