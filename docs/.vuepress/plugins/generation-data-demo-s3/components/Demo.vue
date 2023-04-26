<template>
  <div>
    <h3>Diff of current and previous generations (based on date)</h3>
    <p>
      Using
      <a
        target="_blank"
        href="https://github.com/smori1983/vuepress-plugin-frontmatter-update-info/blob/master/src/generation-util/diff-style-date.js"
      >
        DiffStyleDate<OutboundLink />
      </a>
    </p>
    <p>Records are extracted if:</p>
    <ul>
      <li>The date is new one in current generation.</li>
    </ul>
    <pre class="json">{{ diffDate }}</pre>

    <h3>Diff of current and previous generations (based on date and description)</h3>
    <p>
      Using
      <a
        target="_blank"
        href="https://github.com/smori1983/vuepress-plugin-frontmatter-update-info/blob/master/src/generation-util/diff-style-date-description.js"
      >
        DiffStyleDateDescription<OutboundLink />
      </a>
    </p>
    <p>Records are extracted if:</p>
    <ul>
      <li>The date is new one in current generation, or</li>
      <li>The date is not new but the description was modified.</li>
    </ul>
    <pre class="json">{{ diffDateDescription }}</pre>

    <h3>Update info of current and previous generations</h3>
    <p>Stored on Amazon S3.</p>
    <ul>
      <li><code>generation_0</code>: current</li>
      <li><code>generation_1</code>: previous</li>
    </ul>
    <pre class="json">{{ data }}</pre>
  </div>
</template>

<script>
import OutboundLink from '@vuepress/core/lib/client/components/OutboundLink.vue';
import data from '@dynamic/generation-data-demo-s3/data';
import Generation from 'vuepress-plugin-frontmatter-update-info/src/generation-util/generation';
import DiffStyleDate from 'vuepress-plugin-frontmatter-update-info/src/generation-util/diff-style-date';
import DiffStyleDateDescription from 'vuepress-plugin-frontmatter-update-info/src/generation-util/diff-style-date-description';

export default {
  components: {
    OutboundLink,
  },

  data() {
    return {
      data: data,
      diffDate: [],
      diffDateDescription: [],
    };
  },

  mounted() {
    const generation0 = new Generation(data.generation_0);
    const generation1 = new Generation(data.generation_1);

    this.diffDate = new DiffStyleDate().get(generation0, generation1);
    this.diffDateDescription = new DiffStyleDateDescription().get(generation0, generation1);
  },
};
</script>

<style lang="stylus" scoped>
.json {
  font-size 12px
  color white
}
</style>
