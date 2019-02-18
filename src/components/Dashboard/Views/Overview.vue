<template>
  <div>
    <div class="row mb-1" v-if="!isAdmin">
      <form @submit.prevent="onFarmMeasurementsSubmit">
        <div class="col-lg-3 col-sm-6">
          <fg-select label="Farm" v-model="searchParams.farmId" :options="farmList"/>
        </div>
        <div class="col-lg-3 col-sm-6">
          <fg-date v-show="showRange" label="Date range" v-model="dateRangeComputed" range/>
          <fg-date v-show="!showRange" label="Date" v-model="searchParams.dateFrom"/>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <span class="d-block" style="margin-top: .5rem">&nbsp;</span>
            <button class="btn btn-primary mr-1" type="submit">
              <span class="ti-filter icon"></span>Filter
            </button>
            <button class="btn btn-secondary mr-1" @click="resetSearchParams" type="button">
              <span class="ti-close icon"></span>Clear
            </button>
            <button class="btn btn-secondary" @click="onShowRangeChange" type="button">
              <span :class="`${showRange === true ? 'ti-minus' : 'ti-plus'} icon`"></span>
              Use range of dates
            </button>
          </div>
        </div>
      </form>
    </div>
    <hr>
    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="(stats,index) in statsCards" :key="index">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            <span v-html="stats.value">{{stats.value}}</span>
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i>
            {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row" v-if="!isAdmin">
      <div class="col-lg-12">
        <chart-card
          :chart-data="airHumidityChartConfig.data"
          :chart-options="airHumidityChartConfig.options"
        >
          <h4 class="title" slot="title">Air humidity</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>
            {{ refreshTimespan }}
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Humidity
          </div>
        </chart-card>
      </div>
    </div>
    <div class="row" v-if="!isAdmin">
      <div class="col-lg-12">
        <chart-card
          :chart-data="temperatureChartConfig.data"
          :chart-options="temperatureChartConfig.options"
        >
          <h4 class="title" slot="title">Temperature</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>
            {{ refreshTimespan }}
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Temperature
          </div>
        </chart-card>
      </div>
    </div>
    <div class="row" v-if="!isAdmin">
      <div class="col-lg-12">
        <chart-card
          :chart-data="soilHumidityChartConfig.data"
          :chart-options="soilHumidityChartConfig.options"
        >
          <h4 class="title" slot="title">Soil humidity</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>
            {{ refreshTimespan }}
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Humidity
          </div>
        </chart-card>
      </div>
    </div>
    <!--  <div class="row" v-if="!isAdmin">
      
      <div class="col-lg-12">
        <chart-card :chart-data="soilHumiditySecondChartConfig.data" :chart-options="soilHumiditySecondChartConfig.options">
          <h4 class="title" slot="title">Soil Humidity</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>
            {{ refreshTimespan }}
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Soil Humidity
          </div>
        </chart-card>
      </div>
    </div>-->
  </div>
</template>
<script>
import StatsCard from "components/UIComponents/Cards/StatsCard.vue";
import ChartCard from "components/UIComponents/Cards/ChartCard.vue";
import { SensorType } from "utils/constants";
import { getFormattedDate } from "utils";
import { setInterval, clearInterval } from "timers";
import { debug } from "util";

export default {
  components: {
    StatsCard,
    ChartCard
  },
  data() {
    return {
      farmList: [],
      currentFarmStats: null,
      farmMeasurements: null,
      showRange: false,
      minutesFromLastRefresh: 0,
      refreshMeasurementInterval: null,
      refreshMinutesInterval: null,
      dateRange: [],
      searchParams: {
        farmId: null,
        dateFrom: null,
        dateTo: null
      },
      adminStatsCards: [
        {
          type: "warning",
          icon: "ti-user",
          title: "Users",
          value: "1024",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-home",
          title: "Farms",
          value: "3001",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "info",
          icon: "ti-alert",
          title: "Warnings",
          value: "23",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-server",
          title: "Status",
          value: "Online",
          footerText: "In the last hour",
          footerIcon: "ti-timer"
        }
      ],
      humidityChartConfig: {},
      temperatureChartConfig: {},
      airHumidityChartConfig: {},
      soilHumidityChartConfig: {},
      soilHumiditySecondChartConfig: {}
    };
  },
  computed: {
    dateRangeComputed: {
      get() {
        return this.dateRange.join(" to ");
      },
      set(value) {
        (this.searchParams.dateFrom = value[0]),
          (this.searchParams.dateTo = value[1]),
          (this.dateRange = value);
      }
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    statsCards() {
      return this.$store.getters.isAdmin
        ? this.adminStatsCards
        : this.userStatsCards;
    },
    userStatsCards() {
      return [
        {
          type: "warning",
          icon: "ti-shine",
          title: "Temperature",
          value: this.currentTemperature,
          footerText: this.refreshTimespan,
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-light-bulb",
          title: "Light",
          value: this.currentLight,
          footerText: this.refreshTimespan,
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-cloud",
          title: "Air humidity",
          value: this.currentAirHumidity,
          footerText: this.refreshTimespan,
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-world",
          title: "Soil humidity",
          value: this.currentSoilHumidity,
          footerText: this.refreshTimespan,
          footerIcon: "ti-reload"
        }
        /* {
          type: "success",
          icon: "ti-server",
          title: "Status",
          value: "Online",
          footerText: this.refreshTimespan,
          footerIcon: "ti-reload"
        } */
      ];
    },
    currentLight() {
      const light = this.getCurrentMeasurement(SensorType.LIGHT);
      return light ? `${light}%` : "No data";
    },
    currentTemperature() {
      const temp = this.getCurrentMeasurement(SensorType.TEMPERATURE);
      return temp ? `${temp} &deg;C` : "No data";
    },
    currentSoilHumidity() {
      const soilHum = this.getCurrentMeasurement(SensorType.SOIL_HUMIDITY);
      return soilHum ? `${soilHum}%` : "No data";
    },
    currentAirHumidity() {
      const airHum = this.getCurrentMeasurement(SensorType.AIR_HUMIDITY);
      return airHum ? `${airHum}%` : "No data";
    },
    refreshTimespan() {
      return this.minutesFromLastRefresh > 0
        ? `Updated ${this.minutesFromLastRefresh} ${
            this.minutesFromLastRefresh > 1 ? "minutes" : "minute"
          } ago`
        : `Updated now`;
    }
  },
  methods: {
    getCurrentMeasurement(sensorType) {
      if(!this.currentFarmStats) return null;
      return this.currentFarmStats[sensorType];
    },
    getChartConfiguration(sensorType) {
      if (this.farmMeasurements === null) return null;
      const measurement = this.farmMeasurements.find(
        x => x.sensorTypeId === sensorType
      );

      return new Promise((resolve, reject) => {
        const config = {
          data: {
            labels: measurement.labels,
            series: [measurement.data]
          },
          options: {
            low: 0,
            high: Math.max(...measurement.data),
            showArea: true,
            height: "245px",
            axisX: {
              showGrid: true
            },
            lineSmooth: this.$Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false,
          }
        };

        resolve(config);
      });
    },
    resetSearchParams() {
      this.searchParams.farmId = this.farmList[0].value;
      this.showRange = false;
      this.dateRange = [];
      this.searchParams.dateFrom = getFormattedDate(new Date());
      this.searchParams.dateTo = null;
      this.onFarmMeasurementsSubmit();
    },
    onShowRangeChange() {
      this.showRange = !this.showRange;
      if (this.showRange === false) {
        this.dateRange = [];
        this.searchParams.dateFrom = getFormattedDate(new Date());
      } else {
        this.searchParams.dateFrom = null;
      }
    },
    async refreshFarmMeasurements() {
      await this.onFarmMeasurementsSubmit();
      await this.getCurrentFarmStats();
      this.minutesFromLastRefresh = 0;
    },
    refreshMinutes() {
      this.minutesFromLastRefresh += 1;
    },
    async getCurrentFarmStats(){
      const response = await this.$api.getCurrentFarmMeasurements(this.searchParams.farmId);
      debugger
      this.currentFarmStats = response.data || {};
    },
    async onFarmMeasurementsSubmit() {
      const response = await this.$api.getFarmMeasurements(this.searchParams);
      this.farmMeasurements = response.data;
      this.temperatureChartConfig = await this.getChartConfiguration(
        SensorType.TEMPERATURE
      );
      this.airHumidityChartConfig = await this.getChartConfiguration(
        SensorType.AIR_HUMIDITY
      );
      this.soilHumidityChartConfig = await this.getChartConfiguration(
        SensorType.SOIL_HUMIDITY
      );
      this.soilHumiditySecondChartConfig = await this.getChartConfiguration(
        SensorType.SOIL_HUMIDITY
      );
    }
  },
  created() {
    this.refreshMeasurementInterval = setInterval(
      this.refreshFarmMeasurements,
      1000 * 60 * 5
    ); // every 5 minutes
    this.refreshMinutesInterval = setInterval(this.refreshMinutes, 1000 * 60); // every minute
  },
  destroyed() {
    clearInterval(this.refreshMeasurementInterval);
    clearInterval(this.refreshMinutesInterval);
  },
  async beforeMount() {
    const userId = this.$store.getters.userId;
    const response = await this.$api.getFarmListForUser(userId);
    this.farmList = response.data;
    this.resetSearchParams();
    this.refreshFarmMeasurements();
  }
};
</script>
<style>
</style>
