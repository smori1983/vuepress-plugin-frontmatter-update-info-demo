---
home: false
---
# Demo site


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
