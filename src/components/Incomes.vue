<template>
  <div class="incomesContainer">
    <div class="incomesTopContainerSize1 incomesTopContainerSize2">
      <div class="incomesTopContainer">
        <div class="incomesTitle">Incomes</div>
        <div v-if="!!errorMessage" class="incomesErrorMessage">
          {{errorMessage}}
        </div>
        <button v-if="responseSuccess" type="submit" form="incomesForm" class="responseSuccessButton"><Check :size='30'/></button>
        <button v-else type="submit" form="incomesForm" class="buttonStyle2 incomesSaveButton">Save</button>
      </div>
    </div>
    <form @submit.prevent='handleIncomesSave' id="incomesForm" class="incomeContainer incomeContainerNumContains">
      <Income v-for='(elt, i) in store.data.incomes' :key='i'
        :id='i' :freqOptions='freqOptions' @removeIncome='handleRemoveIncome'
        :errorMessage="errorMessage"
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
import { computed, ref } from 'vue';
import { getIncomeAfterTax, getYearlyIncome } from '../utilities/calculations.js';
import { updateData } from '../firebase/functions.js';
import { successAlertDuration } from "@/utilities/constants";
import Income from './Income.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import Check from 'vue-material-design-icons/Check.vue';

export default {
  props: ['freqOptions'],
  setup(props) {
    const store = useStore();

    const errorMessage = ref("");
    const responseSuccess = ref(false);

    const handleIncomesSave = () => {
      // check if everything is filled in
      let allFilled = true;
      store.state.data.incomes.forEach((income) => {
        if (income.name === null || income.amount === null || income.freq === null) {
          allFilled = false;
        }
      });

      // don't update database if not all filled
      if (!allFilled) {
        // ! do error later
        errorMessage.value = "Fill Everything Out";
        return;
      }

      // update store's yearly income
      store.commit('setData', {
        ...store.state.data,
        yearlyTaxedIncome: getIncomeAfterTax(getYearlyIncome(store.state.data && store.state.data.incomes, props.freqOptions))
      });

      // update database
      updateData(store, store.state.data).then((error) => {
        if (!error) { // no error
          errorMessage.value = "";
          responseSuccess.value = true;
          setTimeout(() => {
            responseSuccess.value = false;
          }, successAlertDuration);
        }
        else { // error
          errorMessage.value = "Error Saving to Database";
          console.log("Error: ", error);
        }
      });
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
      errorMessage,
      responseSuccess
    }
  },
  components: {
    Income, Plus, Check
  }
}
</script>

<style scoped>
.incomesContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 280px;
  margin: 20px 20px 60px 20px;
}

.incomesTopContainerSize1 {
  position: sticky;
  top: 60px;
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
}

.incomesTitle {
  font-size: 22px;
  font-weight: 600;
}

.incomesErrorMessage {
  text-align: center;
  color: red;
}

.responseSuccessButton {
  color: green;
  width: fit-content;
  height: 32px;
  /*margin-right: 10px;*/
}

.incomesSaveButton {
  margin: 0;
  width: 7%;
  min-width: 60px;
}

.incomeContainer {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  margin-top: 20px;
}

.incomeAddButton {
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: rgba(3 105 161 / 0.25);
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
  .incomeAddButton {
    height: auto !important;
    padding: 15px 0;
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