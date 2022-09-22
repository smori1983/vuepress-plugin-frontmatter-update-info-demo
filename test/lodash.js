const assert = require('assert');
const { describe, it } = require('mocha');
const { differenceBy, map } = require('lodash');

const data = {
  generation_0: [
    {'path': '/page_02.html', 'recordsHash': '09b39976'},
    {'path': '/page_03.html', 'recordsHash': '79d234dd'},
    {'path': '/page_04.html', 'recordsHash': '242d0f00'},
  ],
  generation_1: [
    {'path': '/page_01.html', 'recordsHash': '75925262'},
    {'path': '/page_02.html', 'recordsHash': '09b39976'},
    {'path': '/page_03.html', 'recordsHash': 'ae8c53f0'},
  ],
};

describe('lodash', () => {
  it('differenceBy for extracting pages', () => {
    const diff = differenceBy(data.generation_0, data.generation_1, (item) => {
      return `${item.path}:${item.recordsHash}`;
    });
    const paths = map(diff, 'path');

    assert.deepStrictEqual(paths, ['/page_03.html', '/page_04.html']);
  });
});
