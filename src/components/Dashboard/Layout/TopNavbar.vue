<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle"
          :class="{toggled: $sidebar.showSidebar}"
          @click="toggleSidebar"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <div class="navbar-right-menu">
        <ul class="nav navbar-nav navbar-right" v-if="isAuthenticated">
          <drop-down :title="username" icon="ti-user icon">
            <li v-if="!isAdmin">
              <router-link to="/admin/profile">
                <i class="ti-settings icon"></i>Settings
              </router-link>
            </li>
            <li>
              <a @click="onLogoutClick">
                <i class="ti-power-off icon"></i>Logout
              </a>
            </li>
          </drop-down>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    },
    isAdmin(){
      return this.$store.getters.isAdmin
    },
    routeName () {
      const { name } = this.$route
      let routeName = this.capitalizeFirstLetter(name);
      
      if(routeName.indexOf("-") > 0){
        routeName = routeName.split("-").join(" ")
      }

      return routeName;
    }
  },
  data () {
    return {
      username: null,
    }
  },
  methods: {
    async onLogoutClick(){
      await this.$store.dispatch('logout');
      this.$router.replace({ name: 'login' });
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
    }
  },
  beforeMount(){
    this.username = this.$store.getters.username;
  }
}
</script>
<style>
</style>
