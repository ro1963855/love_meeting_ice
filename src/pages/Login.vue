<template>
  <div class="login">
    <div class="wrap container">
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
                            type="text"
                            placeholder="Enter your password"></b-form-input>
            </li>
          </ol>
          <button type="button"
                  class="btn btn-primary form_btn w-100"
                  :disabled="isSubmitDisabled">Sign in</button>
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
    };
  },
  created() {
    const account = this.account;
    const password = this.password;
    this.$http.post('/api/account/login', { account, password }).then((response) => {
      console.log(response);
    });
  },
  mounted() {},
  computed: {
    isSubmitDisabled() {
      return this.login.account === '' || this.login.password === '';
    },
  },
  watch: {
    // var(new, old) {}
  },
  methods: {
    // foo() {},
  },
};
</script>
