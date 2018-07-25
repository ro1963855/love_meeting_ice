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
    <div class="casher_container">
      <order-list v-if="selectedTab === 0"></order-list>
      <bill-list v-else></bill-list>
    </div>
  </div>
</template>

<script>
import OrderList from '@/components/OrderList';
import BillList from '@/components/BillList';

export default {
  name: 'casher',
  components: {
    BillList,
    OrderList,
  },
  data() {
    return {
      selectedTab: 0,
      tabs: [
        {
          name: '點單(New)',
        },
        {
          name: '未結帳',
        },
      ],
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {
    // variable(new, old) {}
  },
  methods: {
    // foo() {},
  },
};
</script>
