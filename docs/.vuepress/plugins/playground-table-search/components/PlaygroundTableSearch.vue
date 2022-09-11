<template>
  <div>
    <form class="form" @submit.prevent="search">
      <div class="form-input-group">
        <div class="label">Name</div>
        <input
          type="text"
          class="input"
          :value="form.name"
          @input="form.name = $event.target.value"
          @keyup="search"
        />
      </div>
      <div class="form-input-group">
        <div class="label">Date from</div>
        <datepicker
          wrapper-class="form-date-from"
          :clear-button="true"
          :highlighted="config.highlighted"
          :language="config.language"
          format="yyyy/MM/dd"
          v-model="form.dateFrom"
          @input="search"
        ></datepicker>
      </div>
      <div class="form-input-group">
        <div class="label">Date to</div>
        <datepicker
          wrapper-class="form-date-to"
          :clear-button="true"
          :highlighted="config.highlighted"
          :language="config.language"
          format="yyyy/MM/dd"
          v-model="form.dateTo"
          @input="search"
        ></datepicker>
      </div>
    </form>

    <table>
      <tr>
        <th>Date</th>
        <th>Title</th>
        <th>Memo</th>
      </tr>

      <template v-for="item in data">
      <tr v-if="item._show">
        <td>{{ item.date }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.memo }}</td>
      </tr>
      </template>

    </table>
  </div>
</template>

<script>
import { sprintf } from 'sprintf-js';
import Datepicker from 'vuejs-datepicker/src/components/Datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
import data from '@dynamic/plugin-playground-table-search/data';

export default {
  components: {
    Datepicker,
  },

  data() {
    return {
      data: [],
      config: {
        highlighted: {
          dates: [],
        },
        language: ja,
      },
      form: {
        name: '',
        dateFrom: '',
        dateTo: '',
      },
    };
  },

  mounted() {
    this.data = data.map((item) => {
      return {
        ...item,
        _show: true,
      };
    });

    const dates = new Set(this.data.map((item) => item.date));

    Array.from(dates).forEach((date) => {
      this.config.highlighted.dates.push(new Date(date));
    });
  },

  methods: {
    search() {
      this.data.forEach((item) => {
        item._show = (
          this.checkName(item.title) &&
          this.checkDateFrom(item.date) &&
          this.checkDateTo(item.date)
        );
      });
    },

    checkName(name) {
      if (this.form.name === '') {
        return true;
      }

      return name.toLowerCase().indexOf(this.form.name.toLowerCase()) >= 0;
    },

    checkDateFrom(date) {
      if (this.form.dateFrom === null) {
        return true;
      }

      if (typeof this.form.dateFrom === 'object') {
        return date >= this.dateString(this.form.dateFrom);
      }

      return true;
    },

    checkDateTo(date) {
      if (this.form.dateTo === null) {
        return true;
      }

      if (typeof this.form.dateTo === 'object') {
        return date <= this.dateString(this.form.dateTo);
      }

      return true;
    },

    dateString(date) {
      return sprintf(
        '%d/%02d/%02d',
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
    },
  },
}
</script>

<style lang="stylus" scoped>
.form
  .form-input-group
    margin-bottom 5px
    .label
      display inline-block
      width 100px
    .form-date-from
      display inline-block
    .form-date-to
      display inline-block
</style>
