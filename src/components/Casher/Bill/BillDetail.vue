<template>
  <div class="billDetail">
    <div class="header d-flex">
      <h1>{{ `單號${bill.id} : $${bill.totalPrice}` }}</h1>
    </div>
    <div class="detailBody" v-dragscroll.y="true">
      <ol class="detail_list">
        <li class="flex-column h-auto">
          <div class="detail_title">
            <font-awesome-icon  class="detail-title-icon"
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
                <div  class="detail_menu_ingredient"
                      v-for="(ingredient, ingredientIndex) in meal.ingredients"
                      :key="ingredientIndex">
                  <h3 class="detail_menu_title">{{ ingredient.productName }}</h3>
                  <h3 class="detail_menu_number">{{ `X${ingredient.quantity}` }}</h3>
                </div>
              </li>
            </ol>
          </div>
        </li>
        <li>
          <div class="detail_title">
            <font-awesome-icon  class="detail-title-icon"
                                :icon="['far', 'clock']"></font-awesome-icon>
            <h2>點單時間</h2>
          </div>
          <div class="detail_content">
            <h2>{{ $moment(bill.orderTime).format('YYYY-MM-DD HH:mm:ss') }}</h2>
          </div>
        </li>
        <li>
          <div class="detail_title">
            <font-awesome-icon  class="detail-title-icon"
                                :icon="['fas', 'utensils']"></font-awesome-icon>
            <h2>用餐地點</h2>
          </div>
          <div class="detail_content mutiple_option">
            <h2 v-for="option in eatway.options"
                :key="option.id"
                :class="{choose: option.id === eatway.selectedEatway}"
                @click="eatway.selectedEatway = option.id">{{ option.position }}</h2>
          </div>
        </li>
        <li>
          <div class="detail_title">
            <font-awesome-icon  class="detail-title-icon"
                                :icon="['fas', 'money-bill']"></font-awesome-icon>
            <h2>支付金額</h2>
          </div>
          <div class="detail_content mutiple_option">
            <h2 v-for="(option, index) in pay.options"
                :key="index"
                :class="{choose: option === pay.selectedMoney}"
                @click="clickPayOption(option, index)">{{ getPayString(option, index) }}</h2>
          </div>
        </li>
        <li>
          <div class="detail_title">
            <font-awesome-icon  class="detail-title-icon"
                                :icon="['fas', 'coins']"></font-awesome-icon>
            <h2>找零</h2>
          </div>
          <div class="detail_content">
            <h2>{{ _.isEmpty(giveChange()) ? '' : `$${giveChange()}` }}</h2>
          </div>
        </li>
      </ol>
    </div>
    <div class="detailFooter">
      <b-button variant="danger" @click="$refs.deleteBill.show();">刪除</b-button>
      <b-button variant="warning" @click="setOrder()">編輯</b-button>
      <b-button variant="primary" @click="showCheckoutModal()">結帳</b-button>
    </div>
    <number-inputer :numberInputerOpen.sync="numberInputerOpen"
                    :paySelectedMoney.sync="pay.selectedMoney"
                    :payOptions.sync="pay.options"
                    v-if="numberInputerOpen"></number-inputer>
    <b-modal  ref="deleteBill"
              size="sm"
              ok-title="確定"
              cancel-title="取消"
              @ok="deleteBill()"
              centered
              hide-header>
      <p class="my-4">確定要刪除此筆帳單嗎?</p>
    </b-modal>
    <b-modal  ref="checkoutBill"
              class="checkout_modal"
              size="sm"
              ok-title="確定"
              cancel-title="取消"
              @ok="checkoutBill()"
              centered
              hide-header>
      <p class="my-4">確定結帳?</p>
      <hr>
      <div class="payAndChange">
        <div class="money_desc">
          <p class="money">{{ `$${pay.selectedMoney}` }}</p>
          <p>支付金額</p>
        </div>
        <div class="money_desc">
          <p class="money">{{ `$${giveChange()}` }}</p>
          <p>找零</p>
        </div>
      </div>
    </b-modal>
    <b-alert  class="validate_alert"
              :show="alert.showDismissibleAlert"
              variant="danger"
              @dismissed="resetAlert()"
              dismissible
              fade>
      <h4 class="alert-heading">請填寫下列資訊</h4>
      <p v-for="(errorMsg, index) in alert.errorMsgs" :key="index">
        {{ `${index + 1}. ${errorMsg}` }}
      </p>
    </b-alert>
  </div>
</template>

<script>
import NumberInputer from '@/components/NumberInputer';

export default {
  name: 'billDetail',
  components: {
    NumberInputer,
  },
  props: ['selectedBillId', 'bill'],
  data() {
    return {
      numberInputerOpen: false,
      eatway: {
        selectedEatway: null,
        options: [
          {
            id: 1,
            position: '內用',
          },
          {
            id: 2,
            position: '外帶',
          },
        ],
      },
      pay: {
        selectedMoney: null,
        defaultOptions: [
          100,
          1000,
        ],
        options: [],
      },
      alert: {
        errorMsgs: [],
        showDismissibleAlert: false,
      },
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {},
  watch: {
    bill() {
      this.init();
    },
  },
  methods: {
    init() {
      let lastOption;
      this.pay.selectedMoney = this.bill.payMoney;
      this.eatway.selectedEatway = this.bill.diningPositionId;
      if (this.bill.payMoney && this.pay.defaultOptions.indexOf(this.bill.payMoney) === -1) {
        lastOption = this.bill.payMoney;
      } else {
        lastOption = 0;
      }

      this.pay.options = [this.bill.totalPrice, ...this.pay.defaultOptions, lastOption];
    },
    getPayString(money, index) {
      if (index !== this.pay.options.length - 1) {
        return `$${money}`;
      } else if (money === 0) {
        return '其他';
      } else {
        return `其他 : $${money}`;
      }
    },
    clickPayOption(money, index) {
      this.pay.selectedMoney = money;
      if (index === this.pay.options.length - 1) {
        this.numberInputerOpen = true;
      }
    },
    giveChange() {
      if (this.pay.selectedMoney === null) {
        return '';
      }

      return `${this.pay.selectedMoney - this.bill.totalPrice}`;
    },
    setOrder() {
      this.$store.dispatch('ORDER_SET', this.bill);
      this.$router.push({ name: 'Order' });
    },
    deleteBill() {
      this.bill.billStateId = 4;
      this.$store.dispatch('BILL_DELETE', { bill: this.bill });
      this.$emit('update:selectedBillId', null);
    },
    showCheckoutModal() {
      this.alert.errorMsgs = this.validateInfo();
      if (this._.isEmpty(this.alert.errorMsgs)) {
        this.$refs.checkoutBill.show();
      } else {
        this.alert.showDismissibleAlert = true;
      }
    },
    validateInfo() {
      const errorMsg = [];
      if (this.eatway.selectedEatway === null) {
        errorMsg.push('用餐地點');
      }

      if (this.pay.selectedMoney === null) {
        errorMsg.push('支付金額');
      }

      return errorMsg;
    },
    checkoutBill() {
      this.bill.billStateId = 3;
      this.bill.payMoney = this.pay.selectedMoney;
      this.bill.diningPositionId = this.eatway.selectedEatway;
      this.$store.dispatch('BILL_CHECKOUT', { bill: this.bill });
      this.$emit('update:selectedBillId', null);
    },
    resetAlert() {
      this.alert.showDismissibleAlert = false;
      this.alert.errorMsgs = [];
    },
  },
};
</script>
