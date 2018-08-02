<template>
  <div class="casher_list billList">
    <div class="casher_list_body" v-dragscroll.y="true">
      <ol>
        <li v-for="(bill, index) in bills" :key="index"
            class="casher_list_item bill_list_item">
          <a href="javascrip:">
            <span class="bill_id">
              <h3>{{ `單號: ${bill.id}` }}</h3>
            </span>
            <span class="bill_totalPrice">
              <h3>{{ `$${bill.totalPrice}` }}</h3>
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
  },
};
</script>
