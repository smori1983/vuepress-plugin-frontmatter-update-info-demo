class GenerationPage {
  /**
   * @param {Object} pageData
   */
  constructor(pageData) {
    /**
     * @type {Object}
     * @private
     */
    this._pageData = pageData;
  }

  /**
   * @return {string}
   */
  getPath() {
    return this._pageData.path;
  }

  /**
   * @return {string}
   */
  getTitle() {
    return this._pageData.title;
  }

  /**
   * @return {Object[]}
   */
  getRecords() {
    return this._pageData.records;
  }
}

module.exports = GenerationPage;
