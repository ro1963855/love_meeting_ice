<template>
  <div class="chart incomeChart d-flex">
    <chart-list class="chart_sidelist"></chart-list>
    <b-container class="chart_body" fluid v-dragscroll.y="true">
      <b-row class="mb-3">
        <b-col cols="3" class="chart_form_title"><label :for="`type-date`">日期:</label></b-col>
        <b-col cols="7">
          <v-date-picker mode='range' :formats='formats' v-model='selectedDate'>
            <b-field slot-scope='props'>
                <b-input
                  type='text'
                  icon='calendar'
                  :value='props.inputValue'
                  readonly>
                </b-input>
            </b-field>
          </v-date-picker>
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
  name: 'incomeChart',
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
      unit: '日',
      chartOption: {
        title: {
          text: '',
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          title: {
            text: '收入(元)',
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
          pointFormat:
            '<span style="color:{point.color}"><b>總共 {point.y}</b> 元<br/>',
        },
        series: [
          {
            name: 'date',
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
    selectedDate: {
      handler() {
        this.getDailyChartByRangeDate();
      },
      deep: true,
    },
  },
  methods: {
    getDailyChartByRangeDate() {
      const start = this.$moment(this.selectedDate.start).format('YYYY-MM-DD');
      const end = this.$moment(this.selectedDate.end).format('YYYY-MM-DD');
      this.$http
        .get(`/api/chart/day?startDate=${start}&endDate=${end}`)
        .then((response) => {
          if (response.status === 200) {
            this.countIncomeChartData(response.data);
          } else {
            alert('收益趨勢資訊取得失敗!!!!(嚴重)');
          }
        })
        .catch(() => {
          alert('收益趨勢資訊取得失敗!!!!(嚴重)');
        });
    },
    countIncomeChartData(data) {
      let incomeChartSeries = [];
      if (this.unit === '日') {
        incomeChartSeries = this.getReportDataByDate(data);
      }

      this.setIncomeHighChartInfo(incomeChartSeries);
    },
    setIncomeHighChartInfo(incomeChartSeries) {
      const start = this.$moment(this.selectedDate.start).format('YYYY-MM-DD');
      const end = this.$moment(this.selectedDate.end).format('YYYY-MM-DD');
      this.chartOption.title.text = `${start} - ${end} 收益趨勢`;
      this.chartOption.series[0].data = incomeChartSeries;
    },
    getReportDataByDate(data) {
      const start = new Date(this.selectedDate.start);
      const end = new Date(this.selectedDate.end);
      const incomeChartSeries = [];

      let loop = new Date(start);
      while (loop <= end) {
        const currentDate = this.$moment(loop).format('YYYY-MM-DD');
        let totalPrice = 0;
        this._.forEach(data, (order) => {
          if (
            this.$moment(new Date(order.payTime)).format('YYYY-MM-DD') ===
            currentDate
          ) {
            totalPrice += order.totalPrice;
          }
        });

        incomeChartSeries.push({
          name: this.$moment(loop).format('MM-DD'),
          y: totalPrice,
        });
        loop = new Date(loop.setDate(loop.getDate() + 1));
      }

      return incomeChartSeries;
    },
  },
};
</script>
