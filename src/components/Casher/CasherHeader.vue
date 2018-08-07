<template>
  <div class="casherHeader">
    <ol>
      <router-link :to="{ name: 'Order' }" class="w-50">
        <li :class="{active: selectedTab === 0}">
          {{ `點單(${orderTitle})` }}
        </li>
      </router-link>
      <router-link :to="{ name: 'Bill' }" class="w-50">
        <li :class="{active: selectedTab === 1}">
          未結帳
        </li>
      </router-link>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'casherHeader',
  props: ['selectedTab'],
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    orderId() {
      return this.$store.state.order.id;
    },
    orderTitle() {
      if (!this.orderId) {
        return 'New';
      }

      return `單號${this.orderId}`;
    },
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    // foo() {},
  },
};
</script>
