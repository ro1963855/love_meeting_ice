<template>
  <div class="product" @click="addProduct(product)">
    <img src="@/assets/img/products/花生豆花.jpeg" class="w-100 h-100">
    <div class="desc">
      <h2 class="price">${{ product.price }}</h2>
      <h2 class="name">{{ product.productName }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  name: 'product',
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
  },
  computed: {
    // variable() {},
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    // foo() {},
    addProduct(product) {
      this.$store.dispatch('BILL_ADD', product);
    },
  },
};
</script>
