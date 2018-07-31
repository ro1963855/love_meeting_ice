<template>
  <div class="orderList h-100 position-relative">
    <div class="order" v-dragscroll.y="true">
      <ol>
        <li v-for="(product, productIndex) in order" :key="productIndex"
            class="order_product"
            :class="{active: selectedIndex === productIndex}"
            @click="openOrCloseOrderSetting(productIndex)">
          <a href="javascrip:" class="w-100 h-100">
            <span class="order_desc">
              <h3>{{ product.productName }}</h3>
              <h4>{{ getIngredientsDesc(product.ingredients) }}</h4>
            </span>
            <span class="order_number">
              <h3>{{ product.quantity }}</h3>
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
          <a href="javascript:" @click="sendOrderToBill()">
            <font-awesome-icon :icon="['far', 'list-alt']"></font-awesome-icon>
            <span>送出</span>
          </a>
        </li>
      </ol>
    </footer>
    <order-setting :product.sync="order[selectedIndex]"
                    @delete="removeCurrentProduct()"></order-setting>
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
      selectedIndex: null,
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
    getIngredientsDesc(ingredients) {
      const vm = this;
      let desc = '';
      vm._.forEach(ingredients, (ingredient) => {
        if (!vm._.isEmpty(desc)) {
          desc += '、';
        }
        desc += `${ingredient.productName} X ${ingredient.quantity}`;
      });
      return desc;
    },
    removeCurrentProduct() {
      const currentSelected = this.selectedIndex;
      this.selectedIndex = null;
      this.$store.dispatch('ORDER_REMOVE_BY_Index', currentSelected);
    },
    openOrCloseOrderSetting(index) {
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
      } else {
        this.selectedIndex = null;
      }
    },
    sendOrderToBill() {
      this.$store.dispatch('BILL_ADD', { order: this.order, userId: 1 });
    },
  },
};
</script>
