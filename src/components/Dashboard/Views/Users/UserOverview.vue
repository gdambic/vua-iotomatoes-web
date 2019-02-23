<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <fg-input
          label="Filter"
          type="text"
          placeholder="First name, Last name, E-mail"
          v-model="filterQuery"
        />
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="form-group">
          <label class="d-block">&nbsp;</label>
          <router-link class="btn btn-primary" tag="button" :to="{ name: 'create-user' }">
            <span class="ti-plus icon"></span>Add new
          </router-link>
        </div>
      </div>
    </div>
    <hr>
    <div class="row" v-show="showNoUsersResult">
      <div class="col-lg-12 text-center">
        <p>No users found</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <user-table :users="filteredUsers" @updateStatus="onUpdateUserStatus"></user-table>
      </div>
    </div>
  </div>
</template>

<script>
import UserTable from "./UserTable.vue";

export default {
  components: { UserTable },
  data() {
    return {
      users: [],
      filterQuery: null
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    showNoUsersResult() {
      return this.filteredUsers.length < 1;
    },
    filteredUsers() {
      if (this.filterQuery != null && this.filterQuery !== "") {
        const by = (obj, prop) =>
          obj[prop].toLowerCase().indexOf(this.filterQuery.toLowerCase()) >= 0;
        return this.users.filter(
          x => by(x, "firstName") || by(x, "lastName") || by(x, "email")
        );
      }

      return this.users;
    }
  },
  methods: {
    async onUpdateUserStatus(userId) {
      try {
        await this.$api.updateUserStatus(userId);
        this.$alert.success("Successfully updated user status");
        await this.refreshUsers();
      } catch (error) {
        this.$alert.error("You have failed to update data", error);
      }
    },
    async refreshUsers() {
      const response = await this.$api.getUsers();
      this.users = response.data;
    }
  },
  async beforeMount() {
    await this.refreshUsers();
  }
};
</script>

<style>
</style>
