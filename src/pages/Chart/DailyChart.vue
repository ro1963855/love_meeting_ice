<template>
  <div class="chart dailyChart d-flex">
    <chart-list class="chart_sidelist"></chart-list>
    <b-container class="chart_body" fluid v-dragscroll.y="true">
      <b-row class="mb-3">
        <b-col cols="3" class="chart_form_title"><label :for="`type-date`">日期:</label></b-col>
        <b-col cols="7">
          <v-date-picker mode='single' :formats='formats' v-model='selectedDate'>
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
        <b-col cols="3" class="chart_form_title"><label :for="`type-date`">營業額:</label></b-col>
        <b-col cols="7">
          <p class="chart_form_text">{{ `${totalPrice} 元` }}</p>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="3" class="chart_form_title"><label :for="`type-date`">賣出份數:</label></b-col>
        <b-col cols="7">
          <p class="chart_form_text">{{ `${totalSellProductsNum} 份` }}</p>
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
  name: 'dailyChart',
  components: {
    ChartList,
  },
  props: [],
  data() {
    return {
      selectedDate: null,
      formats: {
        input: ['YYYY-MM-DD'],
      },
      totalPrice: 0,
      totalSellProductsNum: 0,
      chartOption: {
        chart: {
          type: 'column',
        },
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
            name: '餐點',
            colorByPoint: true,
            data: [],
          },
        ],
      },
    };
  },
  created() {
    this.selectedDate = new Date();
  },
  mounted() {},
  computed: {},
  watch: {
    selectedDate() {
      this.getDailyChartByDate();
    },
  },
  methods: {
    getDailyChartByDate() {
      const date = this.$moment(this.selectedDate).format('YYYY-MM-DD');
      this.$http
        .get(`/api/chart/day?startDate=${date}&endDate=${date}`)
        .then((response) => {
          if (response.status === 200) {
            this.countDailyChartData(response.data);
          } else {
            alert('日收益資訊取得失敗!!!!(嚴重)');
          }
        })
        .catch(() => {
          alert('日收益資訊取得失敗!!!!(嚴重)');
        });
    },
    countDailyChartData(data) {
      let totalPrice = 0;
      let totalSellProductsNum = 0;
      let totalProductSellNumberSeries = [];
      this._.forEach(data, (bill) => {
        totalPrice += bill.totalPrice;
        this._.forEach(bill.order, (product) => {
          totalSellProductsNum += product.quantity;
          totalProductSellNumberSeries = this.setProductSellNumberSeries(
            totalProductSellNumberSeries,
            product,
          );
        });
      });

      this.setHighChartInfo(totalProductSellNumberSeries);
      this.totalPrice = totalPrice;
      this.totalSellProductsNum = totalSellProductsNum;
    },
    setHighChartInfo(totalProductSellNumberSeries) {
      totalProductSellNumberSeries = this._.sortBy(
        totalProductSellNumberSeries,
        ['y'],
      ).reverse();
      const date = this.$moment(this.selectedDate).format('YYYY-MM-DD');
      this.chartOption.title.text = `${date} 銷售狀況`;
      this.chartOption.series[0].data = totalProductSellNumberSeries;
    },
    setProductSellNumberSeries(totalProductSellNumberSeries, product) {
      const serie = this._.find(totalProductSellNumberSeries, {
        name: product.productName,
      });
      if (!serie) {
        totalProductSellNumberSeries.push({
          name: product.productName,
          y: product.quantity,
        });
      } else {
        serie.y += product.quantity;
      }

      return totalProductSellNumberSeries;
    },
  },
};
</script>
