<template>
  <div class="numberInputer">
    <div class="wrapper container-fluid">
      <ol class="row">
        <li class="show_panel col-12">
          {{ result }}
        </li>
        <li class="col-3 number" @click="concatNumber(7)">7</li>
        <li class="col-3 number" @click="concatNumber(8)">8</li>
        <li class="col-3 number" @click="concatNumber(9)">9</li>
        <li class="col-3 action" @click="backResult()">
          <font-awesome-icon :icon="['fas', 'arrow-left']"></font-awesome-icon>
        </li>
        <li class="col-3 number" @click="concatNumber(4)">4</li>
        <li class="col-3 number" @click="concatNumber(5)">5</li>
        <li class="col-3 number" @click="concatNumber(6)">6</li>
        <li class="col-3 action" @click="setResultZero()">AC</li>
        <li class="col-3 number" @click="concatNumber(1)">1</li>
        <li class="col-3 number" @click="concatNumber(2)">2</li>
        <li class="col-3 number" @click="concatNumber(3)">3</li>
        <li class="col-3 action" @click="$emit('update:numberInputerOpen', false);">取消</li>
        <li class="col-9 number" @click="concatNumber(0)">0</li>
        <li class="col-3 action" @click="comfirmResult()">確定</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'numberInputer',
  components: {},
  props: [
    'numberInputerOpen',
    'payOptions',
    'paySelectedMoney',
  ],
  data() {
    return {
      result: '0',
    };
  },
  created() {
    this.result = `${this._.last(this.payOptions)}`;
  },
  mounted() {},
  computed: {
    // variable() {},
  },
  watch: {
    // variable(new, old) {}
  },
  methods: {
    concatNumber(number) {
      if (this.result === '0') {
        this.result = `${number}`;
        return;
      }
      this.result += number;
    },
    setResultZero() {
      this.result = '0';
    },
    backResult() {
      const resultLen = this.result.length;
      if (resultLen <= 1) {
        this.result = '0';
      } else {
        this.result = this.result.slice(0, resultLen - 1);
      }
    },
    comfirmResult() {
      const options = this.payOptions;
      const result = parseInt(this.result, 10);
      options[options.length - 1] = result;
      this.$emit('update:payOptions', options);
      this.$emit('update:paySelectedMoney', result);
      this.$emit('update:numberInputerOpen', false);
    },
  },
};
</script>
