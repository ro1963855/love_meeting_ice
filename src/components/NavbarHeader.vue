<template>
  <div class="navbar_header">
    <b-navbar variant="primary" type="light" class="w-100 h-100">
      <b-navbar-brand tag="h1">愛玉見冰</b-navbar-brand>
      <ol class="menu_list">
        <li class="menu_item" v-for="(item, index) in menu" :key="index">
          <a href="javascript:"
              :class="{active: active === index}"
              @click="active = index">{{ item.name }}</a>
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
          router: {},
        },
        {
          name: '統計',
          router: {},
        },
        {
          name: '其他',
          router: {},
        },
        {
          name: '其他',
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
