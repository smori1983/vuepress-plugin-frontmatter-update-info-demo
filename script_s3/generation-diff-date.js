/**
 * @typedef {import('./generation')} Generation
 */

const {
  differenceBy,
} = require('lodash');

class GenerationDiffDate {
  /**
   * @param {Generation} generation0
   * @param {Generation} generation1
   * @return {Object[]}
   */
  get(generation0, generation1) {
    const result = [];

    generation0.getPaths().forEach((path) => {
      const generation0Page = generation0.getPage(path);
      const generation1Page = generation1.getPage(path);

      if (generation1Page) {
        const targetRecords = differenceBy(generation0Page.getRecords(), generation1Page.getRecords(), (record) => {
          return record.date;
        });

        if (targetRecords.length > 0) {
          result.push({
            path: generation0Page.getPath(),
            title: generation0Page.getTitle(),
            records: targetRecords,
          });
        }
      } else {
        result.push({
          path: generation0Page.getPath(),
          title: generation0Page.getTitle(),
          records: generation0Page.getRecords(),
        });
      }
    });

    return result;
  }
}

module.exports = GenerationDiffDate;
