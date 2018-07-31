import axios from 'axios';
import _ from 'lodash';

export default {
  strict: true,
  state: {
    meals: null,
    ingredients: null,
  },
  mutations: {
    setMenu(state, menu) {
      const meals = menu;
      const ingredients = _.remove(meals, category => category.categoryName === '配料');
      state.meals = meals;
      state.ingredients = ingredients;
    },
  },
  actions: {
    Menu_READ: (context) => {
      axios.get('/api/menu')
        .then((response) => {
          if (response.status === 200) {
            context.commit('setMenu', response.data);
          } else {
            alert('菜單讀取失敗!!!!(嚴重)');
          }
        }).catch(() => {
          alert('菜單讀取失敗!!!!(嚴重)');
        });
    },
  },
};
