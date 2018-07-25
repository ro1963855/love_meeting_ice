<template>
  <div class="productMenu container-fluid">
    <div class="product_category row" v-dragscroll.x="true">
      <ol v-if="mainDish">
        <li v-for="(category, categoryId) in mainDish"
            v-bind:key="categoryId">
          <a href="javascript:;"
              :class="{active: active == categoryId}"
              @click="active = categoryId">{{ category.categoryName }}</a>
        </li>
      </ol>
    </div>
    <div class="product_list" v-if="mainDish" v-dragscroll.y="true">
      <div class="row">
        <div class="col-md-6 col-lg-4 col-xl-3"
              v-for="(product, productIndex) in mainDish[active].products"
              v-bind:key="productIndex">
        <product v-bind:product="product"></product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product';

export default {
  name: 'productMenu',
  components: {
    Product,
  },
  data() {
    return {
      active: 1,
    };
  },
  created() {},
  mounted() {},
  computed: {
    mainDish() {
      return this.$store.state.menu.mainDish;
    },
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {},
};
</script>
