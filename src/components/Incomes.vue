<template>
  <h3>Incomes:</h3>
  <button @click='handleAddIncome'>Add Income Source</button>
  <br />
  <br />
  <form @submit.prevent='handleIncomesSave'>
    <Income v-for='(elt, i) in store.data.incomes' :key='i'
      :id='i' :freqOptions='freqOptions' @removeIncome='handleRemoveIncome'
    />
    <button>Save</button>
  </form>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { getIncomeAfterTax, getYearlyIncome } from '../utilities/calculations.js';
import { updateData } from '../firebase/functions.js';
import Income from './Income.vue';

export default {
  props: ['freqOptions'],
  setup(props) {
    const store = useStore();

    const handleIncomesSave = () => {
      // check if everything is filled in
      let allFilled = true;
      store.state.data.incomes.forEach((income) => {
        if (income.amount === null || income.freq === null) {
          allFilled = false;
        }
      });

      // don't update database if not all filled
      if (!allFilled) {
        // ! do error later
        console.log('FILL IN EVERYTHING IN FORMS');
        return;
      }

      // update store's yearly income
      store.commit('setData', {
        ...store.state.data,
        yearlyTaxedIncome: getIncomeAfterTax(getYearlyIncome(store.state.data && store.state.data.incomes, props.freqOptions))
      });

      // update database
      updateData(store, store.state.data);      
    }

    const handleAddIncome = () => {
      const temp = store.state.data;
      temp.incomes.push({amount: null, freq: null});
      store.commit('setData', temp);
    }
    const handleRemoveIncome = (incomeid) => {
      const temp = store.state.data;
      temp.incomes.splice(incomeid, 1);
      store.commit('setData', temp);
    }

    return {
      handleIncomesSave, 
      handleAddIncome,
      store: computed(() => store.state),
      handleRemoveIncome,
    }
  },
  components: {
    Income
  }
}
</script>

<style>

</style>