<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <fg-input label="Filter" type="text" placeholder="Name, City, User" v-model="filterQuery"/>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="form-group">
          <label class="d-block">&nbsp;</label>
          <router-link class="btn btn-primary" tag="button" to="addFarm">
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
      <div v-if="!isAdmin" v-show="!showNoFarmsResult">
        <div class="col-lg-6 col-md-6 col-sm-12" v-for="farm in filteredFarms" :key="farm.id">
          <show-farm-form :farm="farm" :edit="true"></show-farm-form>
        </div>
      </div>
      <div v-else>
        <div class="col-lg-12">
          <div class="card card-fixed">
            <div class="content table-responsive">
              <table class="table">
                <thead>
                  <th>#</th>
                  <th>Name</th>
                  <th>User</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Date created</th>
                  <th>Date modified</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr v-for="farm in filteredFarms" :key="farm.id">
                    <td class="text-center">{{ farm.id }}</td>
                    <td>{{ farm.name }}</td>
                    <td>{{ farm.user | default }}</td>
                    <td>{{ farm.address }}</td>
                    <td>{{ farm.cityName }}</td>
                    <td>{{ farm.dateCreated | datetime }}</td>
                    <td>{{ farm.dateModified | datetime }}</td>
                    <td>
                      <router-link tag="button" class="btn btn-secondary" to="editFarm">
                        <span class="ti-pencil icon"></span>Edit
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowFarmForm from "./Farms/ShowFarmForm.vue";

export default {
  components: { ShowFarmForm },
  data() {
    return {
      farms: [],
      filterQuery: null,
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
        const by = (obj, prop) => obj[prop].toLowerCase().indexOf(this.filterQuery.toLowerCase()) >= 0;
        return this.farms.filter(x => by(x, "name") || by(x, "cityName") || by(x, "user"));
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
