<template>
  <div class="casher_list has_footer orderList position-relative">
    <div class="casher_list_body" v-dragscroll.y="true">
      <ol>
        <li v-for="(product, productIndex) in order" :key="productIndex"
            class="casher_list_item order_product"
            :class="{active: selectedIndex === productIndex}"
            @click="openOrCloseOrderSetting(productIndex)">
          <a href="javascrip:">
            <span class="order_desc">
              <h3>{{ product.productName }}</h3>
              <h4>{{ getIngredientsDesc(product.ingredients) }}</h4>
            </span>
            <span class="order_number">
              <h3>{{ product.quantity }}</h3>
              <h4>{{ `$${product.totalCost}` }}</h4>
            </span>
          </a>
        </li>
      </ol>
    </div>
    <div class="casher_list_footer">
      <ol>
        <li class="w-50" @click="$store.dispatch('ORDER_CLEAN');">
          <cahser-action :action="{icon: ['fas', 'broom'], name: '清空'}"></cahser-action>
        </li>
        <li class="w-50" @click="sendOrderToBill()">
          <cahser-action :action="{icon: ['far', 'list-alt'], name: '送出'}"></cahser-action>
        </li>
      </ol>
    </div>
    <order-setting :product.sync="order[selectedIndex]"
                    @delete="removeCurrentProduct()"></order-setting>
  </div>
</template>

<script>
import CahserAction from '@/components/Casher/CahserAction';
import OrderSetting from '@/components/Casher/Order/OrderSetting';

export default {
  name: 'orderList',
  components: {
    CahserAction,
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
