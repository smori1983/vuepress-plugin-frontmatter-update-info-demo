<template>
  <div>
    <h1>{{ config.nameIndex.title }}</h1>
    <ul>
      <li v-for="name in nameList">
        <router-link :to="link(name)">{{ name }}</router-link>
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
      nameList: [],
    };
  },

  mounted() {
    const container = new PackageContainer(this.$site.pages);

    this.nameList = container.getNameList();
  },

  methods: {
    /**
     * @param {string} name
     * @return {string}
     */
    link(name) {
      return this.config.namePage.path.replace(':name', name);
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
