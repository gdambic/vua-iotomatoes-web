<template>
  <div class="card">
    <div class="header">
      <slot name="title"></slot>
      <p class="category">
        <slot name="subTitle"></slot>
      </p>
    </div>
    <div class="content">
      <div class="chart-container" style="position: relative">
        <canvas :id="chartId" :ref="chartId"></canvas>
      </div>
      <div class="footer">
        <div class="chart-legend">
          <slot name="legend"></slot>
        </div>
        <hr>
        <div class="stats">
          <slot name="footer"></slot>
        </div>
        <div class="pull-right"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";

export default {
  name: "chart-card",
  props: {
    footerText: {
      type: String,
      default: ""
    },
    headerTitle: {
      type: String,
      default: "Chart title"
    },
    chartType: {
      type: String,
      default: "line" // Line | Pie | Bar
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          datasets: []
        };
      }
    }
  },
  data() {
    return {
      chartId: "no-id"
    };
  },
  methods: {
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart() {
      const context = this.$refs[this.chartId];
      const chartElement = new Chart(context, {
        type: this.chartType,
        data: {
          labels: this.chartData.labels,
          datasets: this.chartData.datasets
        },
        options: this.chartOptions
      });
    },
    /***
     * Assigns a random id to the chart
     */
    updateChartId() {
      const currentTime = new Date().getTime().toString();
      const randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  beforeMount() {
    this.updateChartId();
    this.$nextTick(this.initChart);
  },
  beforeUpdate(){
    this.$nextTick(this.initChart);
  }
};
</script>
<style>
</style>
