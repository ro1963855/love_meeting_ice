<template>
  <div class="billDetail" v-dragscroll.y="true">
    <div class="header d-flex">
      <h1>{{ `單號${bill.id} : $${bill.totalPrice}` }}</h1>
    </div>
    <div class="detailBody">
      <ol class="detail_list">
        <li>
          <div class="detail_title">
            <font-awesome-icon class="detail-title-icon"
                                :icon="['far', 'clock']"></font-awesome-icon>
            <h2>點單時間</h2>
          </div>
          <div class="detail_content">
            <h2>{{ $moment(bill.orderTime).format('YYYY-MM-DD HH:mm:ss') }}</h2>
          </div>
        </li>
        <li>
          <div class="detail_title">
            <font-awesome-icon class="detail-title-icon"
                                :icon="['fas', 'utensils']"></font-awesome-icon>
            <h2>用餐地點</h2>
          </div>
          <div class="detail_content mutiple_option">
            <h2 v-for="(option, index) in eatway.options"
                :key="index"
                :class="{choose: index === eatway.selected}"
                @click="eatway.selected = index">{{ option }}</h2>
          </div>
        </li>
        <li>
          <div class="detail_title">
            <font-awesome-icon class="detail-title-icon"
                                :icon="['fas', 'money-bill']"></font-awesome-icon>
            <h2>支付金額</h2>
          </div>
          <div class="detail_content mutiple_option">
            <h2 v-for="(option, index) in pay.options"
                :key="index"
                :class="{choose: index === pay.selected}"
                @click="clickPayOption(index)">{{ getPayString(option, index) }}</h2>
          </div>
        </li>
        <li>
          <div class="detail_title">
            <font-awesome-icon class="detail-title-icon"
                                :icon="['fas', 'coins']"></font-awesome-icon>
            <h2>找零</h2>
          </div>
          <div class="detail_content">
            <h2>{{ giveChange() }}</h2>
          </div>
        </li>
        <li class="flex-column h-auto">
          <div class="detail_title">
            <font-awesome-icon class="detail-title-icon"
                                :icon="['fas', 'clipboard-list']"></font-awesome-icon>
            <h2>餐點</h2>
          </div>
          <div class="detail_menu_list">
            <ol>
              <li v-for="(meal, mealIndex) in bill.order" :key="mealIndex">
                <div class="detail_menu_meal">
                  <h3 class="detail_menu_title">
                    {{ `${mealIndex + 1}.${meal.productName}` }}
                  </h3>
                  <h3 class="detail_menu_number">{{ `X${meal.quantity}` }}</h3>
                  <h3 class="detail_menu_cost">{{ `$${meal.totalCost}` }}</h3>
                </div>
                <div class="detail_menu_ingredient"
                      v-for="(ingredient, ingredientIndex) in meal.ingredients"
                      :key="ingredientIndex">
                  <h3 class="detail_menu_title">{{ ingredient.productName }}</h3>
                  <h3 class="detail_menu_number">{{ `X${ingredient.quantity}` }}</h3>
                </div>
              </li>
            </ol>
          </div>
        </li>
      </ol>
    </div>
    <number-inputer :numberInputerOpen.sync="numberInputerOpen"
                    :payOptions.sync="pay.options"
                    v-if="numberInputerOpen"></number-inputer>
  </div>
</template>

<script>
import NumberInputer from '@/components/NumberInputer';

export default {
  name: 'billDetail',
  components: {
    NumberInputer,
  },
  props: ['bill'],
  data() {
    return {
      numberInputerOpen: false,
      eatway: {
        selected: null,
        options: ['內用', '外帶'],
      },
      pay: {
        selected: null,
        defaultOptions: [
          100,
          1000,
          0,
        ],
        options: [],
      },
    };
  },
  created() {
    this.pay.options = [this.bill.totalPrice, ...this.pay.defaultOptions];
  },
  mounted() {},
  computed: {},
  watch: {
    bill() {
      this.eatway.selected = null;
      this.pay.selected = null;
      this.pay.options = [this.bill.totalPrice, ...this.pay.defaultOptions];
    },
  },
  methods: {
    getPayString(money, index) {
      if (index !== this.pay.options.length - 1) {
        return `$${money}`;
      } else if (money === 0) {
        return '其他';
      } else {
        return `其他 : $${money}`;
      }
    },
    clickPayOption(index) {
      this.pay.selected = index;
      if (index === this.pay.options.length - 1) {
        this.numberInputerOpen = true;
      }
    },
    giveChange() {
      if (this.pay.selected === null) {
        return '';
      }

      return `$${this.pay.options[this.pay.selected] - this.bill.totalPrice}`;
    },
  },
};
</script>
