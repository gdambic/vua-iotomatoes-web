<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Basic information</h4>
    </div>
    <div class="content">
      <form @submit.prevent="onSaveUserSubmit">
        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Username"
              placeholder="Username"
              :disabled="isProfile || isEdit"
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
              :disabled="isProfile || isEdit"
              placeholder="First Name"
              v-model="user.firstName"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Last Name"
              :disabled="isProfile || isEdit"
              placeholder="Last Name"
              v-model="user.lastName"
            ></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <button
                type="button"
                class="btn btn-secondary btn-wd mr-1"
                @click="$router.push({ name: 'users' })"
              >
                <span class="ti-arrow-left icon"></span>Back
              </button>
              <button type="submit" class="btn btn-info btn-fill btn-wd">
                <span class="ti-save icon"></span>Save
              </button>
            </div>
          </div>
        </div>
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
        lastName: null,
        roleId: 2,
      }
    };
  },
  computed: {
    isProfile() {
      return this.$route.name === "profile";
    },
    isEdit() {
      return this.$route.name === "edit-user";
    },
    isCreate() {
      return this.$route.name === "create-user";
    }
  },
  methods: {
    async onSaveUserSubmit() {
      try {
        if (this.isProfile || this.isEdit) {
          const { data } = await this.$api.updateUser(this.user);
          this.$alert.success("Successfully updated user data");

          if (this.isProfile) {
            this.$store.commit("updateUser", data);
            this.user = this.$store.state.auth.user;
          }
        } else if(this.isCreate) {
          await this.$api.createUser(this.user);
          this.$alert.success("Successfully created user");
          this.$router.push({ name: 'users' })
        }
      } catch (error) {
        this.$alert.error("Failed to update data", error);
      }
    }
  },
  async beforeMount() {
    if (this.isProfile) {
      this.user = this.$store.state.auth.user || {};
    } else if (this.isEdit) {
      const response = await this.$api.getUser(this.$route.params.id);
      this.user = response.data;
    }
  }
};
</script>
<style>
</style>
