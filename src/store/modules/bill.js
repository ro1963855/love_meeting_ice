import axios from 'axios';
import _ from 'lodash';
import store from '@/store';

export default {
  strict: true,
  state: {
    data: [],
  },
  mutations: {
    setBill(state, bills) {
      _.forEach(bills, (bill) => {
        _.forEach(bill.order, (order) => {
          let cost = order.price;
          _.forEach(order.ingredients, (ingredient) => {
            cost += ingredient.price * ingredient.quantity;
          });

          order.totalCost = cost * order.quantity;
        });
      });
      state.data = bills;
    },
    addBill(state, bill) {
      state.data.push(bill);
      store.dispatch('ORDER_CLEAN');
    },
  },
  actions: {
    BILL_READ: (context) => {
      axios.get('/api/bill')
        .then((response) => {
          if (response.status === 200) {
            context.commit('setBill', response.data);
          } else {
            alert('帳單讀取失敗!!!!(嚴重)');
          }
        }).catch(() => {
          alert('帳單讀取失敗!!!!(嚴重)');
        });
    },
    BILL_ADD: (context, { order, userId }) => {
      if (_.isEmpty(order)) {
        alert('餐點為空，無法送出');
        return;
      }

      const orderSimple = order;
      let totalPrice = 0;
      _.forEach(orderSimple, (product) => {
        totalPrice += product.totalCost;
        _.remove(product.sideDishlist, sideDish => sideDish.quantity === 0);
      });

      const bill = {
        userId,
        // state 1 = 出單
        billStatesId: 1,
        totalPrice,
        order: orderSimple,
      };

      axios.post('/api/bill', bill)
        .then((response) => {
          if (response.status === 200) {
            bill.id = response.data.id;
            context.commit('addBill', bill);
          } else {
            alert('帳單送出失敗!!!!(嚴重)');
          }
        }).catch(() => {
          alert('帳單送出失敗!!!!(嚴重)');
        });
    },
  },
};
