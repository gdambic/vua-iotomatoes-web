<template>
  <div class="container-fluid">
    <div class="row">
      <div class="container-login" style="width:400px;">
        <div class="card card-login">
          <div class="header">
            <div class="row">
              <div class="col-lg-12 text-center">
                <img
                  src="../../../static/img/app-logo.png"
                  alt="app_logo"
                  class="logo-login"
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
                <div class="col-lg-12" v-show="showLoginError">
                  <div class="alert alert-danger">
                    <button type="button" aria-hidden="true" class="close" @click="showLoginError = false">×</button>
                    <span>Wrong username or password. Please try again.</span>
                  </div>
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
export default {
  data() {
    return {
      user: {
        username: null,
        password: null
      },
      showLoginError: false
    };
  },
  methods: {
    async onLoginSubmit(e) {
      const { username, password } = this.user;

      if((username == null || username === '') || (password == null || password == '')){
        alert("Enter username and password to submit form.")
        return false;
      }

      try {
        await this.$store.dispatch('login', this.user);
        this.showLoginError = false;
      } catch(e) {
        this.showLoginError = true;
      }

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

.container-login {
  position: relative;
  left: calc(50% - 200px);
}

.logo-login {
  width: 35%;
}

.card-login {
  margin-top: 10rem;
  padding: 1rem;
}

.title-login {
  margin: 2rem;
}
</style>
