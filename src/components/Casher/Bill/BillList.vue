<template>
  <div class="casher_list billList">
    <div class="casher_list_body" v-dragscroll.y="true">
      <ol>
        <li v-for="(bill, index) in bills"
            :key="index"
            v-if="isNotPay(bill.billStateId)"
            class="casher_list_item bill_list_item"
            :class="{active: selectedBillId === bill.id}"
            @click="$emit('update:selectedBillId', bill.id)">
          <a href="javascrip:">
            <span class="bill_id">
              <h3>{{ `單號: ${bill.id}` }}</h3>
            </span>
            <span class="bill_totalPrice">
              <h3>{{ `$${bill.totalPrice}` }}</h3>
              <h4>{{ $moment(bill.orderTime).startOf('second').fromNow() }}</h4>
            </span>
          </a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'billList',
  components: {},
  props: ['selectedBillId'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    bills() {
      return this.$store.state.bill.data;
    },
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    // foo() {},
    isNotPay(billStateId) {
      return billStateId === 1 || billStateId === 2;
    },
  },
};
</script>
