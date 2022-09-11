<template>
  <div>
    <h1>{{ config.dateIndex.title }}</h1>
    <ul>
      <li v-for="date in dateList">
        <router-link :to="link(date)">{{ date }}</router-link>
      </li>
    </ul>
    <hr>
    <ul>
      <li>Back to <router-link :to="config.index.path">{{ config.index.title }}</router-link></li>
    </ul>
  </div>
</template>

<script>
import PackageContainer from '../package-container';

import pluginConfig from '@dynamic/playground-release-diary/config';

export default {
  data() {
    return {
      config: pluginConfig,
      dateList: [],
    };
  },

  mounted() {
    const container = new PackageContainer(this.$site.pages);

    this.dateList = container.getDateList();
  },

  methods: {
    /**
     * @param {string} date
     * @return {string}
     */
    link(date) {
      return this.config.datePage.path.replace(':date', date);
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
