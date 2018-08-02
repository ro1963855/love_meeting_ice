<template>
  <div class="casher bill d-flex">
    <div class="casher_sideList">
      <casher-header :selectedTab="1"></casher-header>
      <bill-list></bill-list>
    </div>
    <div class="casher_body"></div>
  </div>
</template>

<script>
import CasherHeader from '@/components/Casher/CasherHeader';
import BillList from '@/components/Casher/Bill/BillList';

export default {
  name: 'bill',
  components: {
    CasherHeader,
    BillList,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('BILL_READ');
  },
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
