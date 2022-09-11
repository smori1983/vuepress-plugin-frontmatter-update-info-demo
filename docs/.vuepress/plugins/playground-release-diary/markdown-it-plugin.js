module.exports = (md) => {
  md.core.ruler.push('vuepress_plugin_playground_release_diary_back_link', (state) => {
    const token = new state.Token('html_block', '', 0);
    token.content = '<PlaygroundReleaseDiaryBackLink/>';
    token.block = true;

    state.tokens.push(token);
  });
};
