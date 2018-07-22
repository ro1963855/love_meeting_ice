import axios from 'axios';
import _ from 'lodash';

export default {
  strict: true,
  state: {
    mainDish: null,
    sideDish: null,
  },
  mutations: {
    setMenu(state, menu) {
      const mainDish = {};
      const sideDish = [];
      _.forEach(menu, (product) => {
        const dish = {
          productName: product.productsName,
          price: product.price,
          state: product.state.stateName,
        };

        if (product.category.categoryName === '配料') {
          sideDish.push(dish);
        } else {
          if (!mainDish[product.categoryId]) {
            mainDish[product.categoryId] = [];
            mainDish[product.categoryId] = {
              categoryName: product.category.categoryName,
              products: [],
            };
          }

          mainDish[product.categoryId].products.push(dish);
        }
      });

      state.mainDish = mainDish;
      state.sideDish = sideDish;
    },
  },
  actions: {
    Menu_READ: (context) => {
      axios.get('/api/menu')
        .then((response) => {
          if (response.status === 200) {
            context.commit('setMenu', response.data);
          }
        });
    },
  },
};
