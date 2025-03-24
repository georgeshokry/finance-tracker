<template>
  <v-card rounded="lg" elevation="3" title="Expenses Summary"> 
    <v-row class="d-flex justify-center pa-3">
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="series"
        :width="width"
        :height="height"
      />
    </v-row>
  </v-card>
</template>

<script lang="ts">
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    series: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    width: {
      type: [String, Number],
      default: "100%" // Default to full width
    },
    height: {
      type: [String, Number],
      default: 350 // Default height
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "donut"
        },
        labels: this.labels,
        dataLabels: {
          enabled: true,
          formatter: (val, opts) => {
            const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            const percentage = ((opts.w.globals.series[opts.seriesIndex] / total) * 100).toFixed(2);
            return `${percentage}%`; // Display as percentage
          },
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            colors: ["#fff"]
          }
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "Total",
                  formatter: (w) => {
                    return `${w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(3)}`;
                  }
                }
              }
            }
          }
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                width: 280
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  },
  watch: {
    labels(newLabels) {
      this.chartOptions.labels = newLabels;
    }
  }
};
</script>
