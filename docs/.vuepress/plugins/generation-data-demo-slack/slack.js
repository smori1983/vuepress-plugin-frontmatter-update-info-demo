const { WebClient } = require('@slack/web-api');

/**
 * Slack handler for the specific purpose.
 */
class Slack {
  /**
   * @param token
   * @param channelId
   */
  constructor(token, channelId) {
    /**
     * @param {WebClient}
     * @private
     */
    this._client = new WebClient(token);

    /**
     *
     * @private
     */
    this._channelId = channelId;
  }

  /**
   * @param {string} text
   */
  async postMessage(text) {
    await this._client.chat.postMessage({
      channel: this._channelId,
      text: text,
    });
  }
}

module.exports = Slack;
