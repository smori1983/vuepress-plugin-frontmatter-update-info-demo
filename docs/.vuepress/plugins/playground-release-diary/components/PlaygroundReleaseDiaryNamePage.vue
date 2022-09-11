<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="item in itemList">
        <router-link :to="item.path">{{ item.version }} ({{ item.date }})</router-link>
      </li>
    </ul>
    <hr>
    <ul>
      <li>Back to <router-link :to="config.nameIndex.path">{{ config.nameIndex.title }}</router-link></li>
    </ul>
  </div>
</template>

<script>
import PackageContainer from '../package-container';

import pluginConfig from '@dynamic/playground-release-diary/config';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      config: pluginConfig,
      title: '',
      itemList: [],
    };
  },

  mounted() {
    const container = new PackageContainer(this.$site.pages);

    this.title = this.config.namePage.title.replace(':name', this.name);
    this.itemList = container.getByName(this.name);
  },
};
</script>

<style lang="stylus" scoped>
</style>
