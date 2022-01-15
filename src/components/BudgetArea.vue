<template>
  <Dropdown :options='durOptions' :defaultText='area.dur ? area.dur : "Duration of Budget"' @optionClicked='durOptionClicked'/>
  <input type='text' v-model='area.name' placeholder='name' required>
  <input type='number' step='0.01' v-model='area.amount' placeholder='amount' required>
  <div>percent of income: {{ percent }}%</div>
  <div @click='removeArea'>Remove</div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { getPercentOfIncome, getBudgetAmountPerYear } from '../utilities/calculations.js';
import Dropdown from './Dropdown.vue';

export default {
  props: ['id', 'durOptions'],
  emits: ['removeArea'],
  setup(props, { emit }) {
    const store = useStore();

    const area = ref(computed({
      get() { return store.state.data.budgetAreas[props.id] },
      set(val) { store.commit('setData', val) }
    }));

    const durOptionClicked = (option) => {
      area.value.dur = option;
    }

    const removeArea = () => {
      emit('removeArea', props.id);
    }


    return {
      area,
      removeArea,
      percent: computed(() => getPercentOfIncome(getBudgetAmountPerYear(area.value, props.durOptions), store.state.data.yearlyTaxedIncome)),
      durOptionClicked
    }
  },
  components: {
    Dropdown
  }
}
</script>

<style>

</style>