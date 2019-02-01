<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-lg-offset-4">
        <div class="card card-login">
          <div class="header">
            <div class="row">
              <div class="col-lg-6 col-lg-offset-3">
                <img
                  src="../../../static/img/app-logo.png"
                  alt="app_logo"
                  class="img-responsive login-logo"
                >
              </div>
            </div>
            <div class="row" style="margin-top: 10px;">
              <div class="col-lg-12 text-center">
                <h4 class="title title-login">IoTomatoes</h4>
              </div>
            </div>
          </div>
          <div class="content">
            <form @submit.prevent="onLoginSubmit" @keypress.enter="onLoginSubmit">
              <div class="row">
                <div class="col-lg-12">
                  <fg-input
                    type="text"
                    label="Username"
                    name="username"
                    placeholder="Username"
                    v-model="user.username"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <fg-input
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Your password"
                    v-model="user.password"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 text-right">
                  <button class="btn btn-primary" type="submit">
                    <i class="ti-shift-right icon"></i>Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../utils/api';

export default {
  data() {
    return {
      user: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    async onLoginSubmit(e) {
      const { username, password } = this.user;

      if((username == null || username === '') || (password == null || password == '')){
        alert("Enter username or password")
        return false;
      }

      await this.$store.dispatch('login', this.user);
      this.$router.replace({ name: 'overview' })
    }
  }
};
</script>

<style scoped>
.container-fluid {
  background-color: #ccc;
  height: 100vh;
}

.card-login {
  margin-top: 10rem;
  padding: 5rem;
}

.title-login {
  margin: 2rem;
}
</style>
