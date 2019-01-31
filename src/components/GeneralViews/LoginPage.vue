<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-lg-offset-4">
        <div class="card card-login">
          <div class="header">
            <div class="row">
              <div class="col-lg-6 col-lg-offset-3">
                <img src="../../../static/img/app-logo.png" alt="app_logo" class="img-responsive login-logo">
              </div>
            </div>
            <div class="row" style="margin-top: 10px;">
              <div class="col-lg-12 text-center">
                <h4 class="title title-login">IoTomatoes</h4>
              </div>
            </div>
          </div>
          <div class="content">
            <form>
              <div class="row">
                <div class="col-lg-12">
                  <fg-input
                    type="text"
                    label="Username"
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
                    placeholder="Your password"
                    v-model="user.password"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 text-right">
                  <button class="btn btn-primary">
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
  data () {
    return {
      user: {
        username: null,
        password: null
      }
    }
  }
}
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
