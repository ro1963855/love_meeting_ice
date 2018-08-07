export default {
  strict: true,
  state: {
    data: [],
    id: null,
  },
  mutations: {
    addOrder(state, product) {
      const item = {
        ingredients: [],
        ...product,
        quantity: 1,
        totalCost: product.price,
      };

      state.data.push(item);
    },
    cleanOrder(state) {
      state.data = [];
    },
    setOrder(state, bill) {
      state.data = bill.order;
      state.id = bill.id;
    },
    removeOrderByIndex(state, index) {
      state.data.splice(index, 1);
    },
    resetOrder(state) {
      state.data = [];
      state.id = null;
    },
  },
  actions: {
    ORDER_ADD: (context, product) => {
      context.commit('addOrder', product);
    },
    ORDER_CLEAN: (context) => {
      context.commit('cleanOrder');
    },
    ORDER_REMOVE_BY_Index: (context, index) => {
      context.commit('removeOrderByIndex', index);
    },
    ORDER_SET: (context, bill) => {
      context.commit('setOrder', bill);
    },
    ORDER_RESET: (context) => {
      context.commit('resetOrder');
    },
  },
};
