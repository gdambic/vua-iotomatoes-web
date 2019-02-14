import moment from "moment";

const dateTimeFilter = value => {
  return moment(value).format('lll')
}

const dateFilter = value => {
  return moment(value).format('LL')
}

const timeFilter = value => {
  return moment(value).format('LT')
}

const defaultFilter = value => {
  return value == null ? "No data" : value;
}

const GlobalFilters = {
  install(Vue){
    Vue.filter('date', dateFilter)
    Vue.filter('datetime', dateTimeFilter)
    Vue.filter('time', timeFilter)
    Vue.filter('default', defaultFilter)
  }
}

export default GlobalFilters