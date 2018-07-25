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
    removeOrderByIndex(state, index) {
      state.data.splice(index, 1);
    },
  },
  actions: {
    ORDER_ADD: (context, product) => {
      context.commit('addOrder', product);
    },
    ORDER_CLEAN: (context) => {
      context.commit('cleanOrder');
    },
    ORDER_REMOVE_BY_INDEX: (context, index) => {
      context.commit('removeOrderByIndex', index);
    },
  },
};
