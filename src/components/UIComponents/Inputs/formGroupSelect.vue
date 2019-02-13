<template>
  <div class="form-group">
    <label v-if="label">{{label}}</label>
    <select
      v-model="selected"
      class="form-control border-input"
      v-bind="$props"
      @change="onChange($event.target.value)"
    >
      <option :value="''">{{ placeholder }}</option>
      <option v-for="option in options" :value="option.value" :key="option.value">{{option.text}}</option>
    </select>
  </div>
</template>
<script>
export default {
  model: {
    event: 'change'
  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: String,
    name: String,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: ''
    },
    value: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    selected: {
      get(){
        return this.value;
      },
      set(value){
      }
    }
  },
  methods: {
    onChange(value) {
      if (value === "") {
        value = null;
      }

      this.$emit("change", value);
    }
  }
};
</script>
<style>
</style>
