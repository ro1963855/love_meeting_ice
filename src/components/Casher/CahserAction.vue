<template>
  <div class="cahserAction">
    <font-awesome-icon :icon="action.icon"></font-awesome-icon>
    <span>{{ action.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'cahserAction',
  props: ['action'],
  components: {},
  data() {
    return {};
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
