<template>
  <div class="navbar_header">
    <b-navbar variant="primary" type="light" class="w-100 h-100">
      <router-link :to="{ name: 'Order' }">
        <b-navbar-brand tag="h1">愛玉見冰</b-navbar-brand>
      </router-link>
      <ol class="menu_list">
        <li class="menu_item" v-for="(item, index) in menu" :key="index">
          <router-link  :to="item.router"
                        :class="{active: active === index}"
                        @click="active = index">
            {{ item.name }}
          </router-link>
        </li>
      </ol>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar_header',
  components: {},
  data() {
    return {
      active: 0,
      menu: [
        {
          name: '菜單',
          router: { name: 'Order' },
        },
        {
          name: '統計',
          router: {},
        },
        {
          name: '其他',
          router: {},
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
