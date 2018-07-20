<template>
  <div class="productMenu container-fluid">
    <div class="product_category row" v-dragscroll.x="true">
      <ol>
        <li v-for="(category, categoryId) in menu" v-bind:key="categoryId">
          <a href="javascript:;"
              :class="{active: active == categoryId}"
              @click="active = categoryId">{{ category.categoryName }}</a>
        </li>
      </ol>
    </div>
    <!-- <div class="row product_list">

    </div> -->
  </div>
</template>

<script>
export default {
  name: 'productMenu',
  components: {},
  data() {
    return {
      active: 1,
      menu: null,
    };
  },
  created() {
    this.getMenu();
  },
  mounted() {},
  computed: {
    // variable() {},
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    getMenu() {
      const vm = this;
      this.$http.get('/api/menu')
        .then((response) => {
          if (response.status === 200) {
            vm.menu = vm.reArrangeMenu(response.data);
          }
        });
    },
    reArrangeMenu(menus) {
      const menuReArrange = {};
      this._.forEach(menus, (product) => {
        if (!menuReArrange[product.categoryId]) {
          menuReArrange[product.categoryId] = [];
          menuReArrange[product.categoryId] = {
            categoryName: product.category.categoryName,
            product: [],
          };
        }

        menuReArrange[product.categoryId].product.push({
          productsName: product.productsName,
          price: product.price,
          state: product.state.stateName,
        });
      });

      return menuReArrange;
    },
  },
};
</script>
