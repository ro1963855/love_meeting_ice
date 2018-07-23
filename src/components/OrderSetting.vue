<template>
  <div class="orderSetting">
    <div class="header">{{ product.mainDish.product.productName }}</div>
    <div class="content"></div>
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
    // variable() {},
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    // foo() {},
  },
};
</script>
