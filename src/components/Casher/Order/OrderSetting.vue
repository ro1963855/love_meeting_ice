<template>
  <div class="orderSetting" v-if="product && completeIngredients">
    <div class="header">{{ product.productName }}</div>
    <div class="content" v-dragscroll.y="true">
      <ol>
        <li v-for="ingredient in completeIngredients" :key="ingredient.id"
            v-if="ingredient.state.stateName !== '下架'"
            class="sideDish d-flex justify-content-between">
          <p>{{ ingredient.productName }}</p>
          <div class="d-flex quantity">
            <a href="javascript:" @click="countIngredientQuantity(ingredient, -1)">
              <font-awesome-icon :icon="['fas', 'minus']"></font-awesome-icon>
            </a>
            <p>{{ getIngredientQuantity(ingredient.id) }}</p>
            <a href="javascript:" @click="countIngredientQuantity(ingredient, 1)">
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
        <p>{{ product.quantity }}</p>
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
              @ok="$emit('delete')"
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
    completeIngredients() {
      return this.$store.state.menu.ingredients[0].products;
    },
  },
  watch: {
    product: {
      handler() {
        if (this._.isEmpty(this.product)) {
          return;
        }

        this.countProductCost();
      },
      deep: true,
    },
  },
  methods: {
    countProductCost() {
      let cost = this.product.price;
      this._.forEach(this.product.ingredients, (ingredient) => {
        cost += ingredient.price * ingredient.quantity;
      });

      this.product.totalCost = cost * this.product.quantity;
    },
    getIngredientQuantity(ingredientId) {
      const ingredient = this._.find(this.product.ingredients, { id: ingredientId });
      if (ingredient) {
        return ingredient.quantity;
      }
      return 0;
    },
    countTotalQuantity(add) {
      const result = this.product.quantity + add;
      if (result > 0) {
        this.product.quantity = result;
      }
    },
    countIngredientQuantity(ingredient, add) {
      const ingredientIndex = this._.findIndex(this.product.ingredients, { id: ingredient.id });
      // not exist
      if (ingredientIndex === -1) {
        if (add === 1) {
          this.product.ingredients.push({
            id: ingredient.id,
            price: ingredient.price,
            productName: ingredient.productName,
            quantity: 1,
          });
        }
        return;
      }

      // exist
      const result = this.product.ingredients[ingredientIndex].quantity + add;
      if (result > 0) {
        this.product.ingredients[ingredientIndex].quantity = result;
      } else {
        this.product.ingredients.splice(ingredientIndex, 1);
      }
    },
  },
};
</script>
