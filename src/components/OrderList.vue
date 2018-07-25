<template>
  <div class="orderList h-100 position-relative">
    <div class="order" v-dragscroll.y="true">
      <ol>
        <li v-for="(product, index) in order" :key="index"
            class="order_product"
            :class="{active: selectedProduct === index}"
            @click="openOrCloseOrderSetting(index)">
          <a href="javascrip:" class="w-100 h-100">
            <span class="order_desc">
              <h3>{{ product.mainDish.product.productName }}</h3>
              <h4>{{ getSideDishDesc(index) }}</h4>
            </span>
            <span class="order_number">
              <h3>{{ product.mainDish.number }}</h3>
              <h4>${{ product.totalCost }}</h4>
            </span>
          </a>
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
    <order-setting :product.sync="order[selectedProduct]"></order-setting>
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
      selectedProduct: null,
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
    getSideDishDesc(productIndex) {
      let desc = '';
      this._.forEach(this.order[productIndex].sideDishlist, (dish) => {
        if (dish.quantity === 0) {
          return;
        }

        if (desc !== '') {
          desc += '、';
        }

        desc += `${dish.productName} X ${dish.quantity}`;
      });

      return desc;
    },
    removeCurrentProduct() {
      const currentSelected = this.selectedProduct;
      this.selectedProduct = null;
      this.$store.dispatch('ORDER_REMOVE_BY_INDEX', currentSelected);
    },
    openOrCloseOrderSetting(index) {
      if (this.selectedProduct !== index) {
        this.selectedProduct = index;
      } else {
        this.selectedProduct = null;
      }
    },
  },
};
</script>
