<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <fg-input label="Filter" type="text" placeholder="Filter farms" v-model="filterQuery"/>
      </div>
    </div>
    <hr>
    <div class="row" v-show="showNoFarmsResult">
      <div class="col-lg-12 text-center">
        <p>No farms found</p>
      </div>
    </div>
    <div class="row" v-show="!showNoFarmsResult">
      <div class="col-lg-6 col-md-6 col-sm-12" v-for="farm in filteredFarms" :key="farm.id">
        <show-farm-form :farm="farm"></show-farm-form>
      </div>
    </div>
  </div>
</template>

<script>
import ShowFarmForm from "./Farms/ShowFarmForm.vue";

export default {
  components: { ShowFarmForm },
  data(){
    return {
      farms: [],
      filterQuery: null
    }
  },
  computed: {
    showNoFarmsResult(){
      return this.filteredFarms.length < 1
    },
    filteredFarms(){
      if(this.filterQuery != null && this.filterQuery !== ''){
        const by = (obj, prop) => obj[prop].toLowerCase().indexOf(this.filterQuery.toLowerCase()) >= 0;
        return this.farms.filter(x => by(x, 'name') || by(x, 'cityName'));
      }

      return this.farms;
    }
  },
  async beforeMount(){
    const userId = this.$store.getters.userId;
    const response = await this.$api.getFarmsForUser(userId);
    this.farms = response.data;
  }
};
</script>

<style>
</style>
