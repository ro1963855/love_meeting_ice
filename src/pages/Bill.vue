<template>
  <div class="casher bill d-flex">
    <div class="casher_sideList">
      <casher-header :selectedTab="1"></casher-header>
      <bill-list :selectedBillId.sync="selectedBillId"></bill-list>
    </div>
    <div class="casher_body">
      <bill-detail :bill="selectedBill" v-if="selectedBill"></bill-detail>
    </div>
  </div>
</template>

<script>
import CasherHeader from '@/components/Casher/CasherHeader';
import BillList from '@/components/Casher/Bill/BillList';
import BillDetail from '@/components/Casher/Bill/BillDetail';

export default {
  name: 'bill',
  components: {
    CasherHeader,
    BillList,
    BillDetail,
  },
  data() {
    return {
      selectedBillId: 1,
    };
  },
  created() {
    this.$store.dispatch('BILL_READ');
  },
  mounted() {},
  computed: {
    bills() {
      return this.$store.state.bill.data;
    },
    selectedBill() {
      if (!this.bills || !this.selectedBillId) {
        return null;
      } else {
        return this._.find(this.bills, { id: this.selectedBillId });
      }
    },
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    // foo() {},
  },
};
</script>
