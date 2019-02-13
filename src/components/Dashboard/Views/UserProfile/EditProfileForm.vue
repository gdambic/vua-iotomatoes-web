<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Edit Profile</h4>
    </div>
    <div class="content">
      <form @submit.prevent="onUpdateProfileSubmit">
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
          >Update Profile</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: null,
        username: null,
        email: null,
        password: null,
        firstName: null,
        lastName: null
      }
    };
  },
  methods: {
    async onUpdateProfileSubmit() {
      try {
        const { data } = await this.$api.updateUser(this.user);
        this.$store.commit('updateUser', data);
        this.user = this.$store.state.auth.user;
        this.$alert.success("Successfully updated data");
      } catch (error) {
        this.$alert.error("Failed to update data", error);
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
