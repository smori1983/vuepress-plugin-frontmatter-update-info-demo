<template>
  <div>
    <h3>Page list (update info newly added)</h3>
    <pre class="json">{{ newPaths }}</pre>

    <h3>Page list (update info already added)</h3>
    <pre class="json">{{ existingPaths }}</pre>

    <h3>List of new update info</h3>
    <ul>
      <li>New updates: added them all to list</li>
      <li>Existing updates: added to list if descriptions edited (based on <code>recordsHash</code>)</li>
      <li>Empty list means there is no new update info between previous and current deployments.</li>
    </ul>
    <pre class="json">{{ targetPages }}</pre>

    <h3>Update info of current and previous generations</h3>
    <ul>
      <li><code>generation_0</code>: current</li>
      <li><code>generation_1</code>: previous</li>
    </ul>
    <pre class="json">{{ data }}</pre>
  </div>
</template>

<script>
import data from '@dynamic/generation-data-demo-s3/data';

export default {
  data() {
    return {
      data: data,
      newPaths: [],
      existingPaths: [],
      targetPages: [],
    };
  },

  mounted() {
    const generation0Paths = data.generation_0.map(page => page.path);
    const generation1Paths = data.generation_1.map(page => page.path);

    const targetPages = [];

    this.newPaths = generation0Paths.filter((path) => !generation1Paths.includes(path));
    this.existingPaths = generation0Paths.filter((path) => generation1Paths.includes(path));

    this.newPaths.forEach((path) => {
      targetPages.push(this.findPageByPath(data.generation_0, path));
    })

    this.existingPaths.forEach((path) => {
      const generation0Page = this.findPageByPath(data.generation_0, path);
      const generation1Page = this.findPageByPath(data.generation_1, path);

      if (generation0Page.recordsHash !== generation1Page.recordsHash) {
        targetPages.push(generation0Page);
      }
    });

    this.targetPages = targetPages;
  },

  methods: {
    /**
     * @param pages
     * @param path
     * @return {Object}
     */
    findPageByPath(pages, path) {
      return pages.find(page => page.path === path);
    },
  },
};
</script>

<style lang="stylus" scoped>
.json {
  font-size 12px
  color white
}
</style>
