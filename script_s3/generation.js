const GenerationPage = require('./generation-page');

class Generation {
  /**
   * @param {Object[]} generationData
   */
  constructor(generationData) {
    /**
     * @type {Map<string, GenerationPage>}
     * @private
     */
    this._pathMap = new Map();

    generationData.forEach((pageData) => {
      const generationPage = new GenerationPage(pageData);

      this._pathMap.set(generationPage.getPath(), generationPage);
    });
  }

  /**
   * @return {string[]}
   */
  getPaths() {
    return Array.from(this._pathMap.keys());
  }

  /**
   * @param path
   * @return {(GenerationPage|null)}
   */
  getPage(path) {
    return this._pathMap.get(path) || null;
  }

  /**
   * @return {GenerationPage[]}
   */
  getPages() {
    return Array.from(this._pathMap.values());
  }
}

module.exports = Generation;
