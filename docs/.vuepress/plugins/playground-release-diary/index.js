/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageOptions} PageOptions
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');
const escapeHtml = require('escape-html');
const sprintf = require('sprintf-js').sprintf;
const PackageContainer = require('./package-container');

/**
 * @param {Object} options
 * @param {Context} ctx
 * @return {PluginOptionAPI}
 */
module.exports = (options, ctx) => {
  const config = {
    index: {
      path: '/release/',
      title: 'Release list',
    },
    dateIndex: {
      path: '/release/date/',
      title: 'Release list (by date)',
    },
    datePage: {
      path: '/release/date/:date/',
      title: 'Release list (:date)',
    },
    nameIndex: {
      path: '/release/name/',
      title: 'Release list (by name)',
    },
    namePage: {
      path: '/release/name/:name/',
      title: 'Release list (:name)',
    }
  };

  const prepareClientDynamicModules = () => {
    return [
      {
        name: 'playground-release-diary/config.js',
        content: `export default ${JSON.stringify(config, null, 2)}`,
      },
    ];
  };

  /**
   * @param {Page} page
   */
  const preparePageData = (page) => {
    if (isTargetPage(page)) {
      page.plugin_playground_release_diary_target = true;
    }
  };

  /**
   * @param {Page} page
   * @return {boolean}
   * @private
   */
  const isTargetPage = (page) => {
    return (
      page.frontmatter.package_release &&
      page.frontmatter.package_release.date &&
      /^\d{4}\/\d{2}\/\d{2}$/.test(page.frontmatter.package_release.date) &&
      page.frontmatter.package_release.name &&
      page.frontmatter.package_release.version
    );
  }

  const prepareDiaryPages = async () => {
    const result = [];

    const container = new PackageContainer(ctx.pages);

    result.push(prepareIndex());

    result.push(prepareDateIndex());
    container.getDateList().forEach((date) => {
      result.push(prepareDatePage(date));
    });

    result.push(prepareNameIndex());
    container.getNameList().forEach((name) => {
      result.push(prepareNamePage(name));
    })

    return result;
  };

  /**
   * @return {Partial<PageOptions>}
   */
  const prepareIndex = () => {
    return {
      path: config.index.path,
      content: '<PlaygroundReleaseDiaryIndex/>',
      frontmatter: {
        title: config.index.title,
      },
    };
  };

  /**
   * @return {Partial<PageOptions>}
   */
  const prepareDateIndex = () => {
    return {
      path: config.dateIndex.path,
      content: '<PlaygroundReleaseDiaryDateIndex/>',
    };
  };

  /**
   * @param {string} date
   * @return {Partial<PageOptions>}
   */
  const prepareDatePage = (date) => {
    return {
      path: config.datePage.path.replace(':date', date),
      content: sprintf('<PlaygroundReleaseDiaryDatePage date="%s"/>', escapeHtml(date)),
    };
  };

  /**
   * @return {Partial<PageOptions>}
   */
  const prepareNameIndex = () => {
    return {
      path: config.nameIndex.path,
      content: '<PlaygroundReleaseDiaryNameIndex/>',
    };
  };

  /**
   * @param {string} name
   * @return {Partial<PageOptions>}
   */
  const prepareNamePage = (name) => {
    return {
      path: config.namePage.path.replace(':name', name),
      content: sprintf('<PlaygroundReleaseDiaryNamePage name="%s"/>', escapeHtml(name)),
    };
  };

  return {
    name: 'playground-release-diary',

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    chainMarkdown(config) {
      config
        .plugin('vuepress-plugin-playground-release-diary')
        .use(require('./markdown-it-plugin'));
    },

    clientDynamicModules() {
      return prepareClientDynamicModules();
    },

    extendPageData($page) {
      preparePageData($page);
    },

    async additionalPages() {
      return await prepareDiaryPages();
    }
  };
};
