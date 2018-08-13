<template>
  <div class="{{ camelCase name }}">
  </div>
</template>

<script>
export default {
  name: '{{ camelCase name }}',
  components: {},
  props: [],
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
    // variable: {
    //   handler() {},
    //   deep: true,
    // },
  },
  methods: {
    // foo() {},
  },
};
</script>
