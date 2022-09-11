class PackageInfo {
  /**
   * @param {string} date
   * @param {string} name
   * @param {string} version
   * @param {string} path
   */
  constructor(date, name, version, path) {
    /**
     * @type {string}
     * @private
     */
    this._date = date;

    /**
     * @type {string}
     * @private
     */
    this._name = name;

    /**
     * @type {string}
     * @private
     */
    this._version = version;

    /**
     * @type {string}
     * @private
     */
    this._path = path;
  }

  /**
   * @return {string}
   */
  get date() {
    return this._date;
  }

  /**
   * @return {string}
   */
  get name() {
    return this._name;
  }

  /**
   * @return {string}
   */
  get version() {
    return this._version;
  }

  /**
   * @return {string}
   */
  get path() {
    return this._path;
  }
}

module.exports = PackageInfo;
