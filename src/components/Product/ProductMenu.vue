<template>
  <div class="productMenu container-fluid">
    <div class="product_category row" v-dragscroll.x="true">
      <ol v-if="meals">
        <li v-for="(category) in meals"
            v-bind:key="category.id">
          <a href="javascript:;"
              :class="{active: selected == category.id}"
              @click="selected = category.id">{{ category.categoryName }}</a>
        </li>
      </ol>
    </div>
    <div class="product_list" v-if="selectedCategory" v-dragscroll.y="true">
      <div class="row" v-dragscroll.y="true">
        <div class="col-md-6 col-lg-4 col-xl-3"
              v-for="product in selectedCategory.products"
              v-bind:key="product.id"
              v-if="product.state.stateName !== '下架'">
        <product v-bind:product="product"></product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product/Product';

export default {
  name: 'productMenu',
  components: {
    Product,
  },
  data() {
    return {
      selected: null,
    };
  },
  created() {
    if (this.meals) {
      this.selected = this._.head(this.meals).id;
    }
  },
  mounted() {},
  computed: {
    meals() {
      return this.$store.state.menu.meals;
    },
    selectedCategory() {
      if (this.meals) {
        return this._.find(this.meals, { id: this.selected });
      }
      return null;
    },
  },
  watch: {
    meals() {
      this.selected = this._.head(this.meals).id;
    },
  },
  methods: {},
};
</script>
