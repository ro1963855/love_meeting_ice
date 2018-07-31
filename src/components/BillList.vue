<template>
  <div class="billList h-100">
    <p v-for="(bill, index) in bills" :key='index'>{{ `單號: ${bill.id}` }}</p>
    <!-- <div class="bill">
      <ol>
        <li v-for="(product, index) in bill" :key="index">{{ product.productName }}</li>
      </ol>
    </div>
    <footer>
      <ol>
        <li class="w-full">
          <a href="javascript:">
            <font-awesome-icon :icon="['fas', 'money-bill']"></font-awesome-icon>
            <span>結帳</span>
          </a>
        </li>
      </ol>
    </footer> -->
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
