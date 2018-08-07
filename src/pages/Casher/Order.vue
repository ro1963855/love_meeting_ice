<template>
  <div class="casher order d-flex">
    <div class="casher_sideList">
      <casher-header :selectedTab="0"></casher-header>
      <order-list></order-list>
    </div>
    <div class="casher_body">
      <product-menu/>
    </div>
  </div>
</template>

<script>
import CasherHeader from '@/components/Casher/CasherHeader';
import OrderList from '@/components/Casher/Order/OrderList';
import ProductMenu from '@/components/Product/ProductMenu';

export default {
  name: 'order',
  components: {
    CasherHeader,
    OrderList,
    ProductMenu,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('Menu_READ');
  },
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
