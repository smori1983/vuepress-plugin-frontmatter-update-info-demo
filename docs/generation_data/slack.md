# Demo (Amazon S3 + Slack)


## How ?

This demo plugin uses Amazon S3 to store generation data.
At every static site generation, new updates are extracted from previous and current update info data.

See: [Plugin code](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info-demo/tree/master/docs/.vuepress/plugins/generation-data-demo-slack)

### npm packages

- [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3)
- [@slack/web-api](https://www.npmjs.com/package/@slack/web-api)

### Setup Slack

- Create and configure Slack application.
- Grant `chat:write` permission.
- Generate bot user OAuth token.
- Invite the bot user to arbitrary channel.


## Example of notification

![](./img/slack.01.png)
