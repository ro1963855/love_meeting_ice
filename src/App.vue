<template>
  <div id="app">
    <router-view v-if="isLoginLayout"/>
    <div class="totoal_layout" v-else>
      <navbar-header/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader';
import config from '@/assets/config';

export default {
  name: 'App',
  components: {
    NavbarHeader,
  },
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
      if (!config.auth) {
        return;
      }

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
