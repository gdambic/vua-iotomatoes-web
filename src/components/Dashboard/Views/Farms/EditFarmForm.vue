<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Basic information</h4>
    </div>
    <div class="content">
      <form @submit.prevent="onUpdateFarmSubmit">
        <div class="row">
          <div class="col-lg-3">
            <fg-input label="Name" placeholder="Name" v-model="farm.name"/>
          </div>
          <div class="col-lg-3">
            <fg-select label="User" v-model="farm.userId" :options="users"/>
          </div>
          <div class="col-lg-3">
            <fg-input label="Address" placeholder="Address" v-model="farm.address"/>
          </div>
          <div class="col-lg-3">
            <fg-select label="City" v-model="farm.cityId" :options="cities"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <fg-input
              label="Latitude"
              placeholder="Latitude"
              v-model="farm.latitude"
              :mask-options="DecimalMask"
            />
          </div>
          <div class="col-lg-3">
            <fg-input
              label="Longitude"
              placeholder="Longitude"
              v-model="farm.longitude"
              :mask-options="DecimalMask"
            />
          </div>
          <div class="col-lg-3">
            <fg-select label="Ruleset" v-model="farm.ruleSetId" :options="rulesets"/>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd">
            <span class="ti-save icon"></span> Save
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
import { DecimalMask } from "utils/constants";

export default {
  data() {
    return {
      DecimalMask,
      users: [],
      cities: [],
      sensors: [],
      actuators: [],
      rulesets: [],
      farm: {
        id: null,
        name: null,
        address: null,
        cityId: null,
        longitude: null,
        latitude: null,
        rulesetId: null
      }
    };
  },
  computed: {
    isEdit() {
      return this.$route.name === "edit-farm";
    },
    isCreate() {
      return this.$route.name === "create-farm";
    }
  },
  methods: {
    onUpdateFarmSubmit() {}
  },
  async beforeMount() {
    const response = await Promise.all([
      this.$api.getUserList(),
      this.$api.getSensorList(),
      this.$api.getCityList(),
      this.$api.getActuatorList(),
      this.$api.getRulesetList()
    ]);

    const data = response.map(x => x.data);
    this.users = data[0];
    this.sensors = data[1];
    this.cities = data[2];
    this.actuators = data[3];
    this.rulesets = data[4];

    if (this.isEdit) {
      const response = await this.$api.getFarm(this.$route.params.id);
      this.farm = response.data;
    }
  }
};
</script>
<style>
</style>
