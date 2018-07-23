<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="title">Login</h1>
        </div>
        <div class="col-12 login_form">
          <ol>
            <li class="form_item">
              <h2>Account</h2>
              <b-form-input v-model.trim="login.account"
                            type="text"
                            placeholder="Enter your account"></b-form-input>
            </li>
            <li class="form_item">
              <h2>Password</h2>
              <b-form-input v-model.trim="login.password"
                            type="password"
                            placeholder="Enter your password"></b-form-input>
            </li>
          </ol>
          <button type="button"
                  class="btn btn-primary form_btn w-100"
                  :disabled="isSubmitDisabled"
                  @click="sendLoginRequest()">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  data() {
    return {
      login: {
        account: '',
        password: '',
      },
      sessionKey: {
        token: 'token',
      },
    };
  },
  mounted() {},
  computed: {
    isSubmitDisabled() {
      return this.login.account === '' || this.login.password === '';
    },
  },
  methods: {
    sendLoginRequest() {
      const account = this.login.account;
      const password = this.login.password;
      this.$http.post('/api/account/login', { account, password })
        .then((response) => {
          if (response.status === 200) {
            this.$session.start();
            this.$session.set(this.sessionKey.token, response.data.token);
            this.$router.push({ name: 'Home' });
          } else {
            alert('Login failed');
          }
        }).catch(() => {
          alert('Login failed');
        });
    },
  },
};
</script>
