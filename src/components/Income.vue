<template>
  <div class="individualIncomeContainerSize">
    <div class="individualIncomeContainer">
      <Dropdown :options='freqOptions' :defaultText='income.freq ? income.freq : "Income Frequency"' @optionClicked='freqOptionClicked'/>
      <input type='text' v-model='income.name' placeholder='Name' required>
      <input type='number' step='0.01' v-model='income.amount' placeholder='Amount' @keydown="handleKeyDown" required>
      <div>
        <button @click='removeIncome' class="buttonStyle2">Remove</button>
      </div>
  </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Dropdown from './Dropdown.vue';

export default {
  props: ['id', 'freqOptions'],
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
      handleKeyDown
    }
  },
  components: {
    Dropdown
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
}
</style>