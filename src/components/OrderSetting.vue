<template>
  <div class="orderSetting" v-if="product">
    <div class="header">{{ product.mainDish.product.productName }}</div>
    <div class="content" v-dragscroll.y="true">
      <ol v-if="sideDish">
        <li v-for="(dish, index) in product.sideDishlist" :key="index"
            v-if="dish.state !== '下架'"
            class="sideDish d-flex justify-content-between">
          <p>{{ dish.productName }}</p>
          <div class="d-flex quantity">
            <a href="javascript:" @click="countSideDish(index, dish, -1)">
              <font-awesome-icon :icon="['fas', 'minus']"></font-awesome-icon>
            </a>
            <p>{{ dish.quantity }}</p>
            <a href="javascript:" @click="countSideDish(index, dish, 1)">
              <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
            </a>
          </div>
        </li>
      </ol>
    </div>
    <footer>
      <div class="total_quantity d-flex">
        <a href="javascript:" @click="countTotalQuantity(-1)">
          <font-awesome-icon :icon="['fas', 'minus']"></font-awesome-icon>
        </a>
        <p>{{ product.mainDish.number }}</p>
        <a href="javascript:" @click="countTotalQuantity(1)">
          <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
        </a>
      </div>
      <div class="action">
        <p>刪除</p>
        <a href="javascript:" @click="$refs.assertDelete.show()">
          <font-awesome-icon :icon="['fas', 'trash-alt']"></font-awesome-icon>
        </a>
      </div>
    </footer>
    <b-modal id="assertDelete"
              ref="assertDelete"
              size="sm"
              ok-title="確定"
              cancel-title="取消"
              @ok="deleteProduct"
              centered
              hide-header>
      <p class="my-4">確定要刪除嗎?</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'orderSetting',
  props: ['product'],
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    sideDish() {
      return this.$store.state.menu.sideDish;
    },
  },
  watch: {
    product: {
      handler() {
        if (this._.isEmpty(this.product)) {
          return;
        }

        if (this.product.sideDishlist.length === 0) {
          this.initProduct();
        } else {
          this.countProductCost();
        }
      },
      deep: true,
    },
  },
  methods: {
    initProduct() {
      if (this._.isEmpty(this.product) || this.product.sideDishlist.length !== 0) {
        return;
      }

      this._.forEach(this.sideDish, (dish, index) => {
        this.$set(this.product.sideDishlist, index, {
          ...dish,
          quantity: 0,
        });
      });
    },
    countProductCost() {
      let cost = this.product.mainDish.product.price;
      this._.forEach(this.product.sideDishlist, (dish) => {
        cost += dish.price * dish.quantity;
      });

      this.product.totalCost = cost * this.product.mainDish.number;
    },
    getSidedishQuantity(sideDish) {
      if (this._.isEmpty(sideDish)) {
        return 0;
      } else {
        return sideDish.quantity;
      }
    },
    countTotalQuantity(add) {
      const result = this.product.mainDish.number + add;
      if (result > 0) {
        this.product.mainDish.number = result;
      }
    },
    countSideDish(index, sideDish, add) {
      const result = this.product.sideDishlist[index].quantity + add;
      if (result >= 0) {
        this.product.sideDishlist[index].quantity = result;
      }
    },
    deleteProduct() {
      this.$parent.removeCurrentProduct();
    },
  },
};
</script>
