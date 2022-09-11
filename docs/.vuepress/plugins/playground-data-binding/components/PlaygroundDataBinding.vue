<template>
  <div>
    <table>
      <tr>
        <th>field</th>
        <th>value</th>
        <th>value (mirror)</th>
      </tr>
      <tr>
        <td>input1</td>
        <td>
          <input
            type="text"
            v-model="input1"
          />
        </td>
        <td>
          <input
            type="text"
            v-model="input1"
          />
        </td>
      </tr>
      <tr>
        <td>input2</td>
        <td>
          <input
            type="text"
            v-bind:value="input2"
            v-on:input="input2 = $event.target.value"
          />
        </td>
        <td>
          <input
            type="text"
            v-bind:value="input2"
            v-on:input="input2 = $event.target.value"
          />
        </td>
      </tr>
    </table>

    <button
      v-bind:disabled="!hasValue"
      @click="clearInputs"
    >Clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
    };
  },

  mounted() {
  },

  computed: {
    hasValue() {
      return this.input1.length > 0 || this.input2.length > 0;
    }
  },

  methods: {
    clearInputs() {
      this.input1 = '';
      this.input2 = '';
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
