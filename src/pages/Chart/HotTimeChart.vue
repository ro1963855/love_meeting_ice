<template>
  <div class="chart hotTimeChart">
    <chart-list class="chart_sidelist"></chart-list>
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
    return {};
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
