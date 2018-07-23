export default {
  strict: true,
  state: {
    data: [],
  },
  mutations: {
    addOrder(state, product) {
      const item = {
        sideDishlist: [],
        mainDish: {
          product,
          number: 1,
        },
        totalCost: product.price,
      };

      state.data.push(item);
    },
    cleanOrder(state) {
      state.data = [];
    },
  },
  actions: {
    ORDER_ADD: (context, product) => {
      context.commit('addOrder', product);
    },
    ORDER_CLEAN: (context) => {
      context.commit('cleanOrder');
    },
  },
};
