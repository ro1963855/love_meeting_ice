<template>
  <div class="chart hotProductChart">
    <chart-list class="chart_sidelist"></chart-list>
  </div>
</template>

<script>
import ChartList from '@/components/Chart/ChartList';

export default {
  name: 'hotProductChart',
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
