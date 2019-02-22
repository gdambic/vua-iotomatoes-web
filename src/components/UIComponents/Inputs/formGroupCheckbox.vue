<template>
  <div class="form-group">
    <span class="d-block mt-1" v-if="form">&nbsp;</span>
    <label>
      <input
        type="checkbox"
        :checked="shouldBeChecked"
        :value="value"
        @change="updateInput"
      >
      <span class="ml-1">{{ label }}</span>
    </label>
  </div>
</template>
<script>
export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    value: {
      type: String | Number
    },
    modelValue: {
      default: false
    },
    label: {
      type: String,
      required: true
    },
    form: {
      type: Boolean,
      default: false,
    },
    // We set `true-value` and `false-value` to the default true and false so
    // we can always use them instead of checking whether or not they are set.
    // Also can use camelCase here, but hyphen-separating the attribute name
    // when using the component will still work
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    }
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue;
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked;

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];

        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }

        this.$emit("change", newValue);
      } else {
        this.$emit("change", isChecked ? this.trueValue : this.falseValue);
      }
    }
  }
};
</script>