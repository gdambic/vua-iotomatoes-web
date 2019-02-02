<template>
  <div>
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
    <div class="row">
      <div class="col-xs-12">
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
          <h4 class="title" slot="title">Users behavior</h4>
          <span slot="subTitle">24 Hours performance</span>
          <span slot="footer">
            <i class="ti-reload"></i>Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
import StatsCard from "components/UIComponents/Cards/StatsCard.vue";
import ChartCard from "components/UIComponents/Cards/ChartCard.vue";
export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      userStatsCards: [
        {
          type: "warning",
          icon: "ti-shine",
          title: "Temperature",
          value: "32 &deg;C",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-light-bulb",
          title: "Light",
          value: "48%",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "info",
          icon: "ti-cloud",
          title: "Air humidity",
          value: "20%",
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
        },
      ],
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
        },
      ],
      usersChart: {
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
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
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
    statsCards() {
      return this.$store.getters.isAdmin ? this.adminStatsCards : this.userStatsCards;
    }
  }
};
</script>
<style>
</style>
