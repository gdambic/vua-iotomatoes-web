import Vue from "vue";

class Alert {
  constructor() {
    this.config = {
      group: "main",
      duration: 3000,
      speed: 1000
    };
  }

  alert({ text, type, title }) {
    Vue.notify({ ...this.config, text, type, title });
  }

  success(text) {
    this.alert({ text, type: "success", title: "Success" });
  }

  error(text, error) {
    if(error){
      const errorResponse = error.response || error
      const errorStatus = `${errorResponse.status ? '(' + errorResponse.status + ')' : ''}`
      text = `${text} ${errorStatus}`
    }

    this.alert({ text, type: "error", title: "Error" });
  }

  warn(text) {
    this.alert({ text, type: "warn", title: "Warning" });
  }

  info(text) {
    this.alert({ text, type: "info", title: "Info" });
  }
}

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$alert", {
      get() {
        return new Alert();
      }
    });
  }
};
