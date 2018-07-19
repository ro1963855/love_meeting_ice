<template>
  <div id="app">
    <router-view v-if="isLoginLayout"/>
    <div v-if="!isLoginLayout">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.isAlreadyLogin();
  },
  computed: {
    isLoginLayout() {
      return this.$route.path === '/login';
    },
  },
  watch: {
    $route() {
      this.isAlreadyLogin();
    },
  },
  methods: {
    isAlreadyLogin() {
      const token = this.$session.get('token');
      if (token) {
        this.$http
          .post('/api/account/isLogin', {}, { headers: { 'x-access-token': token } })
          .then()
          .catch(() => {
            this.$router.push({ name: 'Login' });
          });
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
  },
};
</script>
