export default {
  strict: true,
  state: {
    // var: null,
    data: [],
  },
  mutations: {
    // setFoo(state, data) {},
    addBill(state, product) {
      state.data.push(product);
    },
  },
  actions: {
    // FOO_READ: (context) => {},
    BILL_ADD: (context, product) => {
      context.commit('addBill', product);
    },
  },
};
