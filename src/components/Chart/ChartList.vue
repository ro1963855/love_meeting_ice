<template>
  <div class="chartList">
    <b-list-group>
      <b-list-group-item  v-for="(item, index) in list"
                          :key="index"
                          :to="item.router">
        {{ item.desc }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'chartList',
  components: {},
  props: [],
  data() {
    return {
      list: [
        {
          desc: '日收益',
          router: { name: 'DailyChart' },
        },
        {
          desc: '收益趨勢',
          router: { name: 'IncomeChart' },
        },
        {
          desc: '熱門時段',
          router: { name: 'HotTimeChart' },
        },
        {
          desc: '熱門餐點',
          router: { name: 'HotProductChart' },
        },
      ],
    };
  },
  created() {},
  mounted() {},
  computed: {
    // variable() {},
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    // foo() {},
  },
};
</script>
