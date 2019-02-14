<template>
  <div>
    <div class="row mb-1" v-if="!isAdmin">
      <form @submit.prevent="onFarmMeasurementsSubmit">
        <div class="col-lg-3 col-sm-6">
          <fg-select label="Farm" v-model="searchParams.farmId" :options="farmList"/>
        </div>
        <div class="col-lg-3 col-sm-6">
          <fg-input label="Date from" type="date" v-model="searchParams.dateFrom"/>
        </div>
        <div class="col-lg-3 col-sm-6">
          <fg-input label="Date to" type="date" v-model="searchParams.dateTo"/>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="form-group">
            <label class="d-block">&nbsp;</label>
            <button class="btn btn-primary mr-1" type="submit">
              <span class="ti-filter icon"></span>Filter
            </button>
            <button class="btn btn-secondary" @click="resetSearchParams">
              <span class="ti-close icon"></span>Clear
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
      <div class="col-lg-6">
        <chart-card :chart-data="humidityChart.data" :chart-options="humidityChart.options">
          <h4 class="title" slot="title">Humidity</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Humidity
          </div>
        </chart-card>
      </div>
      <div class="col-lg-6">
        <chart-card :chart-data="temperatureChart.data" :chart-options="temperatureChart.options">
          <h4 class="title" slot="title">Temperature</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Temperature
          </div>
        </chart-card>
      </div>
    </div>
    <div class="row" v-if="!isAdmin">
      <div class="col-lg-6">
        <chart-card :chart-data="humidityChart.data" :chart-options="humidityChart.options">
          <h4 class="title" slot="title">Air Humidity</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Air Humidity
          </div>
        </chart-card>
      </div>
      <div class="col-lg-6">
        <chart-card :chart-data="temperatureChart.data" :chart-options="temperatureChart.options">
          <h4 class="title" slot="title">Soil Humidity</h4>
          <span slot="subTitle">Sensor measurements</span>
          <span slot="footer">
            <i class="ti-reload"></i>Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Soil Humidity
          </div>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
import { SensorType } from "utils/constants";
import StatsCard from "components/UIComponents/Cards/StatsCard.vue";
import ChartCard from "components/UIComponents/Cards/ChartCard.vue";

export default {
  components: {
    StatsCard,
    ChartCard
  },
  data() {
    return {
      farms: [],
      farmMeasurements: null,
      searchParams: {
        farmId: null,
        dateFrom: null,
        dateTo: null
      },
      userStatsCards: [],
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
      humidityChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: this.$Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      temperatureChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: this.$Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      }
    };
  },
  computed: {
    isAdmin(){
      return this.$store.getters.isAdmin;
    },
    statsCards() {
      return this.$store.getters.isAdmin
        ? this.adminStatsCards
        : this.userStatsCards;
    },
    farmList() {
      return this.farms.map(x => ({ text: x.name, value: x.id }));
    },
    averageLight(){
      const light = this.calculateAverageMeasurement(SensorType.LIGHT);
      return light ? `${light}%` : "No data"
    },
    averageTemperature(){
      const temp = this.calculateAverageMeasurement(SensorType.TEMPERATURE);
      return temp ? `${temp} &deg;C` : "No data"
    },
    averageSoilHumidity(){
      const soilHum = this.calculateAverageMeasurement(SensorType.SOIL_HUMIDITY);
      return soilHum ? `${soilHum}%` : "No data"
    },
    averageAirHumidity(){
      const airHum = this.calculateAverageMeasurement(SensorType.AIR_HUMIDITY);
      return airHum ? `${airHum}%` : "No data"
    }
  },
  methods: {
    calculateAverageMeasurement(sensorType){
      if(this.farmMeasurements == null) return null;

      const measurements = this.farmMeasurements[sensorType];
      const total = measurements
        .map(x => x.value)
        .reduce((acc, curr) => acc += curr, 0)

      const average = Number(total / measurements.length);
      return isNaN(average) ? null : average.toFixed(1);
    },
    resetSearchParams() {
      this.searchParams.farmId = this.farms[0].id;
      this.searchParams.dateFrom = null;
      this.searchParams.dateTo = null;
    },
    async onFarmMeasurementsSubmit() {
      const response = await this.$api.getFarmMeasurements(this.searchParams);
      this.farmMeasurements = response.data;
      this.refreshUserStatsCards();
      console.log(response);
    },
    refreshUserStatsCards(){
      this.userStatsCards = [
        {
          type: "warning",
          icon: "ti-shine",
          title: "Temperature",
          value: this.averageTemperature,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-light-bulb",
          title: "Light",
          value: this.averageLight,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-cloud",
          title: "Air humidity",
          value: this.averageAirHumidity,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-world",
          title: "Soil humidity",
          value: this.averageSoilHumidity,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
        /* {
          type: "success",
          icon: "ti-server",
          title: "Status",
          value: "Online",
          footerText: "In the last hour",
          footerIcon: "ti-timer"
        } */
      ];
    },
  },
  async beforeMount() {
    const userId = this.$store.getters.userId;
    const response = await this.$api.getFarmsForUser(userId);
    this.farms = response.data;    
    this.resetSearchParams();
    await this.onFarmMeasurementsSubmit();

    setInterval(async () => {
      await this.onFarmMeasurementsSubmit();
    }, (1000 * 60) * 5); // every 5 minutes
  }
};
</script>
<style>
</style>
