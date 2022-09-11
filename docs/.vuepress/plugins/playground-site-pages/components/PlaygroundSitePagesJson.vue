<template>
  <pre class="json">{{ pagesJson }}</pre>
</template>

<script>
export default {
  computed: {
    pagesJson() {
      return JSON.stringify(this.$site.pages, null, 2);
    }
  },
};
</script>

<style lang="stylus" scoped>
.json {
  font-size 12px
  color white
}
</style>
