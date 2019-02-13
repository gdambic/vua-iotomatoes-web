<template>
  <div class="wrapper">
    <side-bar type="sidebar" :sidebar-links="sidebarLinks"/>
    <div class="main-panel">
      <top-navbar />
      <dashboard-content @click.native="toggleSidebar" />
      <content-footer />
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent
    },
    computed: {
      sidebarLinks(){
        const sidebarLinks = this.$sidebar.sidebarLinks;
        return this.$store.getters.isAdmin ? sidebarLinks : sidebarLinks.filter(x => {
          if(x.onlyAdmin === false) return x;
        });
      }
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
