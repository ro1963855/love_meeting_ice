<template>
  <div class="chart hotTimeChart d-flex">
    <chart-list class="chart_sidelist"></chart-list>
    <b-container class="chart_body" fluid v-dragscroll.y="true">
      <b-row class="mb-3">
        <b-col cols="3" class="chart_form_title"><label>日期:</label></b-col>
        <b-col cols="7">
          <v-date-picker mode='range' :formats='formats' v-model='selectedDate' v-if="!ignoreDate">
            <b-field slot-scope='props'>
                <b-input
                  type='text'
                  icon='calendar'
                  :value='props.inputValue'
                  readonly>
                </b-input>
            </b-field>
          </v-date-picker>
          <b-form-input v-if="ignoreDate"
                        type="text"
                        placeholder="全部資訊"
                        readonly></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="3" class="chart_form_title"><label>全部資訊:</label></b-col>
        <b-col cols="7">
          <b-form-checkbox v-model="ignoreDate"></b-form-checkbox>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="12">
          <highcharts :options="chartOption" class="w-100" ref="highcharts"></highcharts>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ChartList from '@/components/Chart/ChartList';

export default {
  name: 'hotTimeChart',
  components: {
    ChartList,
  },
  props: [],
  data() {
    return {
      formats: {
        input: ['YYYY-MM-DD'],
      },
      selectedDate: {
        start: null,
        end: null,
      },
      ignoreDate: false,
      chartOption: {
        title: {
          text: '',
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          title: {
            text: '賣出份數',
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> 份<br/>',
        },
        series: [
          {
            name: '餐點總數量',
            data: [],
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      },
    };
  },
  created() {
    this.selectedDate = {
      start: new Date(),
      end: new Date(),
    };
  },
  mounted() {},
  computed: {
    // variable() {},
  },
  watch: {
    ignoreDate() {
      this.getDailyChart();
    },
    selectedDate: {
      handler() {
        this.getDailyChart();
      },
      deep: true,
    },
  },
  methods: {
    getDailyChart() {
      let filter = '';
      if (!this.ignoreDate) {
        const start = this.$moment(this.selectedDate.start).format(
          'YYYY-MM-DD',
        );
        const end = this.$moment(this.selectedDate.end).format('YYYY-MM-DD');
        filter = `startDate=${start}&endDate=${end}`;
      }

      this.$http
        .get(`/api/chart/day?${filter}`)
        .then((response) => {
          if (response.status === 200) {
            this.countHotTimeData(response.data);
          } else {
            alert('熱門時段資訊取得失敗!!!!(嚴重)');
          }
        })
        .catch(() => {
          alert('熱門時段資訊取得失敗!!!!(嚴重)');
        });
    },
    countHotTimeData(data) {
      const series = this.groupOrderQuantityByOrderTime(data);
      // this.trimFrontAndEndZeroData(series);
      this.setHotTimeHighChartInfo(series);
    },
    groupOrderQuantityByOrderTime(data) {
      const series = [];
      for (let time = 0; time < 24; time += 1) {
        const serie = { name: `${time}點 - ${time + 1}點`, y: 0 };
        this._.forEach(data, (bill) => {
          const curHour = this.$moment(new Date(bill.orderTime)).format('HH');
          if (time !== Number(curHour)) {
            return;
          }

          this._.forEach(bill.order, (order) => {
            serie.y += order.quantity;
          });
        });

        series.push(serie);
      }
      return series;
    },
    // trimFrontAndEndZeroData(series) {
    //   let hasData = false;
    //   let startSlice = null;
    //   let endSlice = null;
    //   _.forEach(series, function(serie, index) {
    //     if (serie.y !== 0 && startSlice === null) {
    //       startSlice = index;
    //     }
    //   });

    //   _.forEachRight(series, function(serie, index) {
    //     if (serie.y !== 0 && endSlice === null) {
    //       endSlice = index;
    //     }
    //   });

    //   console.log(series.slice(startSlice, endSlice + 1));
    // },
    setHotTimeHighChartInfo(series) {
      this.chartOption.series[0].data = series;
    },
  },
};
</script>
