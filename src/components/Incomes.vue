<template>
  <div class="incomesContainer">
    <h3>Incomes:</h3>
    <button @click='handleAddIncome' class="buttonStyle2">Add Income Source</button>
    <br />
    <br />
    <form @submit.prevent='handleIncomesSave'>
      <div class="incomeContainer incomeContainerNumContains">
        <Income v-for='(elt, i) in store.data.incomes' :key='i'
          :id='i' :freqOptions='freqOptions' @removeIncome='handleRemoveIncome'
        />
      </div>
      <button class="buttonStyle2">Save</button>
    </form>
  </div>
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
      temp.incomes.push({name: null, amount: null, freq: null});
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

<style scoped>
.incomesContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 280px;
  margin: 20px;
}

.incomeContainer {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
}
@media only screen and (max-width: 550px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(1, minmax(0, 100vw));
  }
}
@media only screen and (min-width: 550px) and (max-width: 820px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(2, minmax(0, 100vw));
  }
}
@media only screen and (min-width: 820px) and (max-width: 1100px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(3, minmax(0, 100vw));
  }
}
@media only screen and (min-width: 1100px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(4, minmax(0, 100vw));
  }
}
</style>