<template>
  <div v-if="shouldShow">
    <hr>
    <ul>
      <li>Back to <router-link :to="linkForDate(date)">{{ titleForDate(date) }}</router-link></li>
      <li>Back to <router-link :to="linkForName(name)">{{ titleForName(name) }}</router-link></li>
    </ul>
  </div>
</template>

<script>
/**
 * @typedef {import('vuepress-types').Page} Page
 */

import pluginConfig from '@dynamic/playground-release-diary/config';

export default {
  data() {
    return {
      config: pluginConfig,
      shouldShow: false,
      date: '',
      name: '',
    };
  },

  mounted() {
    if (this.$page.plugin_playground_release_diary_target) {
      this.shouldShow = true;
      this.date = this.$page.frontmatter.package_release.date;
      this.name = this.$page.frontmatter.package_release.name;
    }
  },

  methods: {
    /**
     * @param {string} date
     * @return {string}
     */
    linkForDate(date) {
      return this.config.datePage.path.replace(':date', date);
    },

    /**
     * @param {string} date
     * @return {string}
     */
    titleForDate(date) {
      return this.config.datePage.title.replace(':date', date);
    },

    /**
     * @param {string} name
     * @return {string}
     */
    linkForName(name) {
      return this.config.namePage.path.replace(':name', name);
    },

    /**
     * @param {string} name
     * @return {string}
     */
    titleForName(name) {
      return this.config.namePage.title.replace(':name', name);
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
