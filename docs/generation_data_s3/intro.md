# Intro


## How ?

This demo plugin uses Amazon S3.
To demonstrate, it collects update info when `ready()` hook was executed.

See [demo plugin code](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info-demo/tree/master/docs/.vuepress/plugins/generation-data-demo-s3).


## Configuration

### Local site

Copy `config.example.js` and create `config.local.js`.

S3 object key: `vuepress-plugin-frontmatter-update-info.demo.s3.local.json`

### Production site

Register env variables:

- `S3_CONFIGURED` (Set `true` to activate)
- `S3_REGION`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_BUCKET`

S3 object key: `vuepress-plugin-frontmatter-update-info.demo.s3.gh.json`

See also [GitHub Actions configuration](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info-demo/blob/master/.github/workflows/pages.yml) of this demo site.
