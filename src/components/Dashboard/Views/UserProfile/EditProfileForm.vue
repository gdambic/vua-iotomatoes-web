<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Edit Profile</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Username"
              placeholder="Username"
              :disabled="true"
              v-model="user.username"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="password"
              label="Password"
              placeholder="Your password"
              v-model="user.password"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email" label="Email" placeholder="Email" v-model="user.email"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="First Name"
              :disabled="true"
              placeholder="First Name"
              v-model="user.firstName"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Last Name"
              :disabled="true"
              placeholder="Last Name"
              v-model="user.lastName"
            ></fg-input>
          </div>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-info btn-fill btn-wd"
            @click.prevent="updateProfile"
          >Update Profile</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
import Api from "../../../../utils/api";

export default {
  data() {
    return {
      user: {
        username: null,
        email: null,
        password: null,
        firstName: null,
        lastName: null
      }
    };
  },
  methods: {
    async updateProfile() {
      try {
        const response = await Api.update(this.user);
        this.notifyVue("success", "Updated user succesfully");
      } catch (error) {
        this.$notify({
          message: error.message,
          icon: "ti-cancel",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "error"
        });
      }
    }
  },
  beforeMount() {
    this.user = this.$store.state.auth.user || {};
  }
};
</script>
<style>
</style>
