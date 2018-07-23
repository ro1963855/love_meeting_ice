<template>
  <div class="orderList h-100 position-relative">
    <div class="order">
      <ol>
        <li v-for="(product, index) in order" :key="index"
            class="order_product">
            <span>
              <h3>{{ product.mainDish.product.productName }}</h3>
              <h4></h4>
            </span>
            <span class="order_number">
              <h3>{{ product.mainDish.number }}</h3>
              <h4>${{ product.totalCost }}</h4>
            </span>
        </li>
      </ol>
    </div>
    <footer>
      <ol>
        <li class="w-half">
          <a href="javascript:" @click="$store.dispatch('ORDER_CLEAN');">
            <font-awesome-icon :icon="['fas', 'broom']"></font-awesome-icon>
            <span>清空</span>
          </a>
        </li>
        <li class="w-half">
          <a href="javascript:">
            <font-awesome-icon :icon="['far', 'list-alt']"></font-awesome-icon>
            <span>送出</span>
          </a>
        </li>
      </ol>
    </footer>
    <order-setting :product="order[selectedProduct]"></order-setting>
  </div>
</template>

<script>
import OrderSetting from '@/components/OrderSetting';

export default {
  name: 'orderList',
  components: {
    OrderSetting,
  },
  data() {
    return {
      selectedProduct: 0,
    };
  },
  created() {},
  mounted() {},
  computed: {
    order() {
      return this.$store.state.order.data;
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
