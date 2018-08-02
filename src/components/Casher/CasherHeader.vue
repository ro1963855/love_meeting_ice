<template>
  <div class="casherHeader">
    <ol>
      <router-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.to"
        class="w-50">
        <li :class="{active: selectedTab === index}">
          {{ tab.name }}
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
    return {
      tabs: [
        {
          name: '點單(New)',
          to: { name: 'Order' },
        },
        {
          name: '未結帳',
          to: { name: 'Bill' },
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
