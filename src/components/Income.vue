<template>
  <Dropdown :options='freqOptions' :defaultText='income.freq ? income.freq : "Income Frequency"' @optionClicked='freqOptionClicked'/>
  <input type='number' step='0.01' v-model='income.amount' placeholder='amount' @keydown="handleKeyDown" required>
  <div>
    <button @click='removeIncome' class="buttonStyle">Remove</button>
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

<style>

</style>