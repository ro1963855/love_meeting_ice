<template>
  <div class="home d-flex">
    <casher/>
    <product-menu/>
  </div>
</template>

<script>
import Casher from '@/components/Casher';
import ProductMenu from '@/components/ProductMenu';

export default {
  name: 'home',
  components: {
    Casher,
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
