<template>
  <div class="productMenu">
    <div class="product_category" v-dragscroll.x="true">
      <ol>
        <li v-for="(product, index) in products" v-bind:key="index">
          <a href="javascript:;"
              :class="{active: active === index}"
              @click="active = index">{{ product.name }}</a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productMenu',
  components: {},
  data() {
    return {
      active: 0,
      products: [
        {
          name: '豆花類',
        },
        {
          name: '剉冰類',
        },
        {
          name: '手工愛玉',
        },
        {
          name: '冷凍芋',
        },
        {
          name: '飲品類',
        },
      ],
    };
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
