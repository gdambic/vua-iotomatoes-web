<template>
  <div class="form-group">
    <label v-if="label">{{label}}</label>
    <input
      :ref="id"
      class="form-control border-input"
      v-bind="$props"
      type="text"
      :value="value"
      data-input
      @input="onInput"
    >
  </div>
</template>
<script>
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

export default {
  props: {
    id: {
      type: String,
      default: "datepicker"
    },
    label: String,
    name: String,
    disabled: Boolean,
    placeholder: String,
    value: [String, Number, Array],
    maxDate: Date,
    minDate: Date,
    disabledDates: {
      type: Array,
      default: () => []
    },
    dateFormat: {
      type: String,
      default: 'Y-m-d'
    },
    range: Boolean
  },
  methods: {
    onInput(event){
      let value = event.target.value;

      if(this.range === true){
        value = value.split(" to ");
      }

      this.$emit("input", value);
    }
  },
  mounted() {
    let defaultConfig = {
      disable: this.disabledDates,
      dateFormat: this.dateFormat,
      maxDate: this.maxDate,
      minDate: this.minDate
    }

    if(this.range === true){
      defaultConfig = { ...defaultConfig, mode: "range" }
    }

    flatpickr(this.$refs[this.id], defaultConfig);
  }
};
</script>
<style>
</style>
