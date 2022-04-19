<template>
  <div class="individualIncomeContainerSize">
    <div class="individualIncomeContainer">
      <div class="incomeTopBar">
        <Dropdown :options='freqOptions' :defaultText='income.freq ? income.freq : "Income Frequency"' @optionClicked='freqOptionClicked'/>
        <div @click.prevent="removeIncome" class="incomeDeleteIcon"><WindowClose :size='18'/></div>
      </div>
      <div class="incomeInputs">
        <div class="incomeInput">
          <input type='text' v-model='income.name' placeholder='Name' name="Name" id="incomeName" class="floatingInput" />
          <label for="incomeName" data-content="Name"  class="floatingLabel"/>
        </div>
        <div class="incomeInput">
          <input type='number' step='0.01' v-model='income.amount' placeholder='Amount' @keydown="handleKeyDown" name="Amount" id="incomeAmount" class="floatingInput" />
          <label for="incomeAmount" data-content="Amount" class="floatingLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Dropdown from './Dropdown.vue';
import WindowClose from 'vue-material-design-icons/WindowClose.vue'

export default {
  props: ['id', 'freqOptions', 'errorMessage'],
  emits: ['removeIncome'],
  setup(props, { emit }) {
    const store = useStore();

    const income = ref(computed({
      get() { return store.state.data.incomes[props.id] },
      set(val) { store.commit('setData', val) }
    }));

    const freqOptionClicked = (option) => {
      income.value.freq = option;
    }

    const removeIncome = () => {
      emit('removeIncome', props.id);
    }

    const handleKeyDown = (event) => {
      // prevent arrow keys from changing number input
      if (event.which === 38 || event.which === 40) {
        event.preventDefault();
      }
    }


    return {
      freqOptionClicked,
      income,
      removeIncome,
      handleKeyDown,
      labelColor: computed(() => !!props.errorMessage && (income.value.name === null || income.value.amount === null) ? 'red' : 'darkgrey'),
    }
  },
  components: {
    Dropdown, WindowClose
  }
}
</script>

<style scoped>
.individualIncomeContainerSize {
  width: 100%;
}

.individualIncomeContainer {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgb(38 96 136 / 20%);
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  height: 156px;
}

.incomeTopBar {
  display: flex;
  justify-content: space-between;
}

.incomeDeleteIcon {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  margin: -8px -8px;
}
.incomeDeleteIcon:hover {
  background-color: #D0E2EE;
}

.incomeInputs {
  padding-top: 10px;
}

.incomeInput {
  padding: 10px;
}

/*.floatingInput:placeholder-shown + .floatingLabel::before {*/
/*  transform: translate3d(-16px, -27px, 0) scale3d(1, 1, 1);*/
/*  color: v-bind(labelColor);*/
/*}*/
</style>