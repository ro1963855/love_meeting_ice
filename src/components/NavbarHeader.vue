<template>
  <div class="navbar_header">
    <b-navbar variant="primary" type="light" class="w-100 h-100">
      <router-link :to="{ name: 'Order' }">
        <b-navbar-brand tag="h1">愛玉見冰</b-navbar-brand>
      </router-link>
      <ol class="menu_list">
        <li class="menu_item" v-for="(item, index) in menu" :key="index">
          <router-link  :to="item.router"
                        :class="{active: isActivePage(item.containPage) }"
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
      currentRouterName: null,
      menu: [
        {
          name: '菜單',
          router: { name: 'Order' },
          containPage: [
            'Order',
            'Bill',
          ],
        },
        {
          name: '統計',
          router: { name: 'DailyChart' },
          containPage: [
            'DailyChart',
            'IncomeChart',
            'HotTimeChart',
            'HotProductChart',
          ],
        },
        {
          name: '其他',
          router: {},
          containPage: [],
        },
      ],
    };
  },
  created() {
    this.currentRouterName = this.$route.name;
  },
  mounted() {},
  computed: {
    // variable() {},
  },
  watch: {
    // variable(new, old) {}
    $route() {
      this.currentRouterName = this.$route.name;
    },
  },
  methods: {
    // foo() {},
    isActivePage(containPage) {
      return containPage.some((page) => {
        return page === this.currentRouterName;
      });
    },
  },
};
</script>
