<template>
  <div>
    <form @submit.prevent="onUpdateFarmSubmit">
      <div class="card">
        <div class="header mb-1">
          <h4 class="title pull-left">Basic information</h4>
          <div class="row pull-right" v-if="isEdit">
            <div class="col-lg-6">
              <label>Created:</label>
              <span class="monospace no-wrap">{{ farm.dateCreated | datetime }}</span>
            </div>
            <div class="col-lg-6">
              <label>Modified:</label>
              <span class="monospace mr-2">{{ farm.dateModified | datetime }}</span>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="content">
          <div class="row">
            <div class="col-lg-6">
              <div class="row">
                <div class="col-lg-4">
                  <fg-input label="Name" placeholder="Name" v-model="farm.name"/>
                </div>
                <div class="col-lg-4" v-if="isAdmin">
                  <fg-select label="User" v-model="farm.userId" :options="users"/>
                </div>
                <div class="col-lg-4">
                  <fg-input label="Address" placeholder="Address" v-model="farm.address"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <fg-select label="City" v-model="farm.cityId" :options="cities"/>
                </div>
                <div class="col-lg-4">
                  <fg-input
                    label="Latitude"
                    placeholder="Latitude"
                    v-model="farm.latitude"
                    :mask-options="DecimalMask"
                  />
                </div>
                <div class="col-lg-4">
                  <fg-input
                    label="Longitude"
                    placeholder="Longitude"
                    v-model="farm.longitude"
                    :mask-options="DecimalMask"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <fg-select label="Ruleset" v-model="farm.ruleSetId" :options="rulesets"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group">
                    <label>Description</label>
                    <textarea
                      class="form-control border-input"
                      v-model="farm.description"
                      :rows="8"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row">
                <div class="col-lg-12">
                  <google-map
                    :longitude="farmLongitude"
                    :latitude="farmLatitude"
                    :title="farm.name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="isAdmin">
        <div class="col-lg-4">
          <div class="card card-sm-fixed">
            <div class="header">
              <h4 class="title">Sensors</h4>
            </div>
            <div class="content">
              <div class="row">
                <div class="col-lg-12">
                  <fg-input type="text" placeholder="Filter" v-model="filterSensorQuery"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12" v-for="(sensor, idx) in filteredSensors" :key="idx">
                  <fg-checkbox v-model="farm.sensorIds" :value="sensor.value" :label="sensor.text"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card card-sm-fixed">
            <div class="header">
              <h4 class="title">Plants</h4>
            </div>
            <div class="content">
              <div class="row">
                <div class="col-lg-12">
                  <fg-input type="text" placeholder="Filter" v-model="filterPlantQuery"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12" v-for="(plant, idx) in filteredPlants" :key="idx">
                  <fg-checkbox v-model="farm.plantIds" :value="plant.value" :label="plant.text"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card card-sm-fixed">
            <div class="header">
              <h4 class="title">Actuators</h4>
            </div>
            <div class="content">
              <div class="row">
                <div class="col-lg-12">
                  <fg-input type="text" placeholder="Filter" v-model="filterActuatorQuery"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12" v-for="(actuator, idx) in filteredActuators" :key="idx">
                  <fg-checkbox
                    v-model="farm.actuatorIds"
                    :value="actuator.value"
                    :label="actuator.text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center mt-1">
            <button
              type="button"
              class="btn btn-secondary btn-wd mr-1"
              @click="$router.push({ name: 'farms' })"
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
</template>
<script>
import { DecimalMask } from "utils/constants";

export default {
  data() {
    return {
      DecimalMask,
      filterSensorQuery: null,
      filterPlantQuery: null,
      filterActuatorQuery: null,
      users: [],
      cities: [],
      sensors: [],
      actuators: [],
      rulesets: [],
      plants: [],
      farm: {
        id: null,
        name: null,
        address: null,
        cityId: null,
        longitude: null,
        latitude: null,
        ruleSetId: null,
        sensorIds: [],
        actuatorIds: [],
        plantIds: []
      }
    };
  },
  computed: {
    filteredSensors() {
      return this.filterList(this.sensors, this.filterSensorQuery);
    },
    filteredPlants() {
      return this.filterList(this.plants, this.filterPlantQuery);
    },
    filteredActuators() {
      return this.filterList(this.actuators, this.filterActuatorQuery);
    },
    farmLatitude() {
      return Number(this.farm.latitude);
    },
    farmLongitude() {
      return Number(this.farm.longitude);
    },
    isEdit() {
      return this.$route.name === "edit-farm";
    },
    isCreate() {
      return this.$route.name === "create-farm";
    },
    isAdmin(){
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    filterList(list, filterQuery) {
      if (filterQuery != null && filterQuery !== "") {
        const by = (obj, prop) =>
          obj[prop].toLowerCase().indexOf(filterQuery.toLowerCase()) >= 0;
        return list.filter(x => by(x, "text"));
      }

      return list;
    },
    async onUpdateFarmSubmit() {
      try {
        if (this.isCreate) {
          await this.$api.createFarm(this.farm);
          this.$alert.success("Successfully created new farm");
          this.$router.push({ name: "farms" });
        } else {
          await this.$api.updateFarm(this.farm);
          this.$alert.success("Successfully updated farm data");
        }
      } catch (error) {
        this.$alert.error("Failed to update date", error);
      }
    }
  },
  async beforeMount() {
    const response = await Promise.all([
      this.$api.getUserList(),
      this.$api.getSensorList(),
      this.$api.getCityList(),
      this.$api.getActuatorList(),
      this.$api.getRulesetList(),
      this.$api.getPlantList()
    ]);

    const data = response.map(x => x.data);
    this.users = data[0];
    this.sensors = data[1];
    this.cities = data[2];
    this.actuators = data[3];
    this.rulesets = data[4];
    this.plants = data[5];

    if (this.isEdit) {
      const response = await this.$api.getFarm(this.$route.params.id);
      this.farm = response.data;
    }
  }
};
</script>
<style>
</style>
