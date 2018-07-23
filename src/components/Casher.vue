<template>
  <div class="casher">
    <header>
      <ol>
        <li v-for="(tab, index) in tabs" :key="index"
            class="w-half"
            :class="{active: selectedTab === index}"
            @click="selectedTab = index">
          <a href="javascript:">{{ tab.name }}</a>
        </li>
      </ol>
    </header>
    <div class="bill">
      <ol>
        <li v-for="(product, index) in bill" :key="index">{{ product.productName }}</li>
      </ol>
    </div>
    <footer>
      <ol>
        <li :class="{'w-half': selectedTab === 0, 'd-none': selectedTab === 1}">
          <a href="javascript:">
            <font-awesome-icon :icon="['far', 'list-alt']"></font-awesome-icon>
            <span>送出</span>
          </a>
        </li>
        <li :class="{'w-half': selectedTab === 0, 'w-full': selectedTab === 1}">
          <a href="javascript:">
            <font-awesome-icon :icon="['fas', 'money-bill']"></font-awesome-icon>
            <span>結帳</span>
          </a>
        </li>
      </ol>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'casher',
  components: {},
  data() {
    return {
      selectedTab: 0,
      tabs: [
        {
          name: '點單',
        },
        {
          name: '未結帳',
        },
      ],
    };
  },
  created() {},
  mounted() {},
  computed: {
    bill() {
      return this.$store.state.bill.data;
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
