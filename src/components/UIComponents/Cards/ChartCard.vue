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
import { getRandomInt } from "utils";
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
        return {
          maintainAspectRatio: false
        };
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
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      chartId: "no-id",
      chartInstance: null
    };
  },
  computed: {
    context() {
      const context = this.$refs[this.chartId];
      context.height = this.height;
      return context;
    }
  },
  methods: {
    initChart(chartData) {
      this.chartInstance = new Chart(this.context, {
        type: this.chartType,
        data: chartData || this.chartData,
        options: this.chartOptions
      });
    },
    updateChartId() {
      const currentTime = new Date().getTime().toString();
      const randomInt = getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(data) {
        this.chartInstance.destroy();
        this.initChart(data);
      }
    }
  },
  beforeMount() {
    this.updateChartId();
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    this.chartInstance.destroy();
  }
};
</script>
<style>
</style>
