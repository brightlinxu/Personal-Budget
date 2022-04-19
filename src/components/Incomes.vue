<template>
  <div class="incomesContainer">
    <div class="incomesTopContainerSize1 incomesTopContainerSize2">
      <div class="incomesTopContainer">
        <div class="incomesTitle">Incomes</div>
        <button type="submit" form="incomesForm" class="buttonStyle2">Save</button>
      </div>
    </div>
    <form @submit.prevent='handleIncomesSave' id="incomesForm" class="incomeContainer incomeContainerNumContains">
      <Income v-for='(elt, i) in store.data.incomes' :key='i'
        :id='i' :freqOptions='freqOptions' @removeIncome='handleRemoveIncome'
      />
      <button @click='handleAddIncome' type="button" class="incomeAddButton">
        <div class="incomePlusIcon"><Plus :size='25'/></div>
        Add Income Source
      </button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { getIncomeAfterTax, getYearlyIncome } from '../utilities/calculations.js';
import { updateData } from '../firebase/functions.js';
import Income from './Income.vue';
import Plus from 'vue-material-design-icons/Plus.vue'

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
    Income, Plus
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
  /*border: 1px solid #eaeaea;;*/
  /*padding: 30px;*/
  /*border-radius: 5px;*/
}

.incomesTopContainerSize1 {
  position: sticky;
  top: 42px;
  z-index: 100;
}

.incomesTopContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 2px 4px rgb(38 96 136 / 20%);
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
}

.incomesTitle {
  font-size: 22px;
  font-weight: 550;
}

.incomeContainer {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
}

.incomeAddButton {
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #D0E2EE;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  box-shadow: 0px 2px 4px rgb(21 51 71 / 20%);
  transition: 0.2s;
  height: 196px;
  margin: 0;
  padding: 0;
}
.incomeAddButton:hover {
  box-shadow: -0.5px 4px 4px rgb(21 51 71 / 20%);
  transform: translate(0.5px, -2px);
}
.incomeAddButton:active {
  box-shadow: -0.5px 4px 4px rgb(21 51 71 / 20%);
  transform: translate(0.5px, -2px);
  background-color: #c3d5e0;
}

@media only screen and (max-width: 550px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(1, minmax(0, 100vw));
  }
  .incomesTopContainerSize2 {
    width: 116%;
    transform: translate(-8%, 0);
  }
}
@media only screen and (min-width: 550px) and (max-width: 820px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(2, minmax(0, 100vw));
  }
  .incomesTopContainerSize2 {
    width: 108%;
    transform: translate(-4%, 0);
  }
}
@media only screen and (min-width: 820px) and (max-width: 1100px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(3, minmax(0, 100vw));
  }
  .incomesTopContainerSize2 {
    width: 106%;
    transform: translate(-3%, 0);
  }
}
@media only screen and (min-width: 1100px) {
  .incomeContainerNumContains {
    grid-template-columns: repeat(4, minmax(0, 100vw));
  }
  .incomesTopContainerSize2 {
    width: 104%;
    transform: translate(-2%, 0);
  }
}
</style>