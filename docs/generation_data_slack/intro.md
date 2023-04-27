# Intro


## How ?

This demo plugin uses Amazon S3 to store generation data.
At every static site generation, new updates are extracted using [DiffStyleDate](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info/blob/master/src/generation-util/diff-style-date.js) from previous and current update info data.
Then new updates will be sent to Slack.

See [demo plugin code](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info-demo/tree/master/docs/.vuepress/plugins/generation-data-demo-slack).

### npm packages

- [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3)
- [@slack/web-api](https://www.npmjs.com/package/@slack/web-api)

### Setup of Slack

- Create and configure Slack application.
- Grant `chat:write` permission.
- Generate bot user OAuth token.
- Invite the bot user to arbitrary channel.


## Configuration

### Local site

Copy `config.example.js` and create `config.local.js`.

S3 object key: `vuepress-plugin-frontmatter-update-info.demo.slack.local.json`

### Production site

Register env variables:

- `S3_CONFIGURED` (Set `true` to activate)
- `S3_REGION`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_BUCKET`
- `SLACK_CONFIGURED` (Set `true` to activate)
- `SLACK_TOKEN`
- `SLACK_CHANNEL_ID`
- `SLACK_SITE_BASE_PATH`

S3 object key: `vuepress-plugin-frontmatter-update-info.demo.slack.gh.json`

See also [GitHub Actions configuration](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info-demo/blob/master/.github/workflows/pages.yml) of this demo site.
