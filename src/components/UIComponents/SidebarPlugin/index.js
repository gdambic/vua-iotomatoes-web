import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-bar-chart',
      path: '/admin/overview',
      onlyAdmin: false
    },
    {
      name: 'Farms',
      icon: 'ti-home',
      path: '/admin/farms',
      onlyAdmin: false
    },
    {
      name: 'Table List',
      icon: 'ti-view-list-alt',
      path: '/admin/table-list',
      onlyAdmin: true
    },
    {
      name: 'Typography',
      icon: 'ti-text',
      path: '/admin/typography',
      onlyAdmin: true
    },
    {
      name: 'Icons',
      icon: 'ti-pencil-alt2',
      path: '/admin/icons',
      onlyAdmin: true
    },
    {
      name: 'Maps',
      icon: 'ti-map',
      path: '/admin/maps',
      onlyAdmin: true
    },
    {
      name: 'Notifications',
      icon: 'ti-bell',
      path: '/admin/notifications',
      onlyAdmin: true
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
