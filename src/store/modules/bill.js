import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
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
      store.dispatch('ORDER_RESET');
    },
    updateBill(state, bill) {
      const index = _.findIndex(state.data, { id: bill.id });
      state.data[index] = bill;
      store.dispatch('ORDER_RESET');
    },
    deleteBill(state, bill) {
      const index = _.findIndex(state.data, { id: bill.id });
      state.data[index] = bill;
    },
    checkoutBill(state, bill) {
      const index = _.findIndex(state.data, { id: bill.id });
      state.data[index] = bill;
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
    BILL_ADD: (context, { order, orderId, userId }) => {
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
        id: orderId,
        userId,
        // state 1 = 出單
        billStatesId: 1,
        totalPrice,
        order: orderSimple,
        orderTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

      // orderId null means new order
      if (!orderId) {
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
      } else {
        axios.put('/api/bill', bill)
          .then((response) => {
            if (response.status === 204) {
              bill.id = response.data.id;
              context.commit('updateBill', bill);
            } else {
              alert('帳單修改失敗!!!!(嚴重)');
            }
          }).catch(() => {
            alert('帳單修改失敗!!!!(嚴重)');
          });
      }
    },
    BILL_DELETE: (context, { bill }) => {
      const params = {
        id: bill.id,
        billStateId: bill.billStateId,
        deleteTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

      axios.delete('/api/bill', { data: params })
        .then((response) => {
          if (response.status === 204) {
            context.commit('deleteBill', bill);
          } else {
            alert('帳單刪除失敗!!!!(嚴重)');
          }
        }).catch(() => {
          alert('帳單刪除失敗!!!!(嚴重)');
        });
    },
    BILL_CHECKOUT: (context, { bill }) => {
      const params = {
        id: bill.id,
        billStateId: bill.billStateId,
        diningPositionId: bill.diningPositionId,
        payMoney: bill.payMoney,
        payTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

      axios.patch('/api/bill', params)
        .then((response) => {
          if (response.status === 204) {
            context.commit('checkoutBill', bill);
          } else {
            alert('結帳失敗!!!!(嚴重)');
          }
        }).catch(() => {
          alert('結帳失敗!!!!(嚴重)');
        });
    },
  },
};
