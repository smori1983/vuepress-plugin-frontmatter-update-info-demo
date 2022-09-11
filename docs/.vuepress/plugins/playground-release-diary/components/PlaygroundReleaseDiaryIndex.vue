<template>
  <div>
    <h1>Release list</h1>
    <ul>
      <li><router-link :to="config.dateIndex.path">{{ config.dateIndex.title }}</router-link></li>
      <li><router-link :to="config.nameIndex.path">{{ config.nameIndex.title }}</router-link></li>
    </ul>
  </div>
</template>

<script>
import pluginConfig from '@dynamic/playground-release-diary/config';

export default {
  data() {
    return {
      config: pluginConfig,
    };
  },
};
</script>

<style lang="stylus" scoped>
</style>
