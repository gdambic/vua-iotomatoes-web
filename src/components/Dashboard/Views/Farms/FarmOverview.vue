<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <fg-input label="Filter" type="text" placeholder="Name, City" v-model="filterQuery"/>
      </div>
      <div class="col-lg-3 col-sm-6" v-if="isAdmin">
        <div class="form-group">
          <label class="d-block">&nbsp;</label>
          <router-link class="btn btn-primary" tag="button" :to="{ name: 'create-farm' }">
            <span class="ti-plus icon"></span>Add new
          </router-link>
        </div>
      </div>
    </div>
    <hr>
    <div class="row" v-show="showNoFarmsResult && !isAdmin">
      <div class="col-lg-12 text-center">
        <p>No farms found</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div v-if="!isAdmin" class="row" v-show="!showNoFarmsResult">
          <div class="col-lg-6 col-md-12 col-sm-12" v-for="farm in filteredFarms" :key="farm.id">
            <farm-card :farm="farm" :edit="true"></farm-card>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-lg-12">
            <farm-table :farms="filteredFarms"></farm-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FarmCard from "./FarmCard.vue";
import FarmTable from "./FarmTable.vue";

export default {
  components: { FarmCard, FarmTable },
  data() {
    return {
      farms: [],
      filterQuery: null
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    showNoFarmsResult() {
      return this.filteredFarms.length < 1;
    },
    filteredFarms() {
      if (this.filterQuery != null && this.filterQuery !== "") {
        const by = (obj, prop) =>
          obj[prop].toLowerCase().indexOf(this.filterQuery.toLowerCase()) >= 0;
        return this.farms.filter(x => by(x, "name") || by(x, "cityName"));
      }

      return this.farms;
    }
  },
  async beforeMount() {
    const userId = this.$store.getters.userId;
    const apiCallback = this.isAdmin
      ? this.$api.getFarms
      : this.$api.getFarmsForUser;

    const response = await apiCallback(userId);
    this.farms = response.data;
  }
};
</script>

<style>
</style>
