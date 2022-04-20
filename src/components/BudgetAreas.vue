<template>
  <div class="budgetsContainer">
    <div class="budgetsTopContainerSize1 budgetsTopContainerSize2">
      <div class="budgetsTopContainer">
        <div class="budgetsTitle">Budgets</div>
        <div :v-if="!!errorMessage" class="budgetsErrorMessage">
          {{errorMessage}}
        </div>
        <button v-if="responseSuccess" type="submit" form="budgetsForm" class="responseSuccessButton"><Check :size='26'/></button>
        <button v-else type="submit" form="budgetsForm" class="buttonStyle2">Save</button>
      </div>
    </div>
    <form @submit.prevent='handleBudgetAreasSave' id="budgetsForm" class="budgetContainer budgetContainerNumContains">
      <BudgetArea v-for='(elt, i) in store.data.budgetAreas' :key='i'
        :id='i' :durOptions='durOptions' @removeArea='handleRemoveArea'
      />
      <button @click='handleAddArea' type="button" class="budgetAddButton">
        <div class="budgetPlusIcon"><Plus :size='25'/></div>
        Add Budget Area
      </button>
    </form>
  </div>
<!--  <div>total percentage of income used: {{ totalPercent }}%</div>-->
<!--  <div>total income used in budget period: ${{ totalIncomeUsed }} / ${{ store.data.incomeForPeriod }}</div>-->
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { updateData } from '../firebase/functions.js';
import BudgetArea from './BudgetArea.vue';
import { getTotalPercent, getFirstDayOfWeek, getFirstDayOfMonth } from '../utilities/calculations.js';
import Plus from 'vue-material-design-icons/Plus.vue';
import Check from 'vue-material-design-icons/Check.vue'

export default {
  setup(props) {
    const store = useStore();
    const FIRSTMONDAY = {
      month: 1,
      day: 3,
      year: 2022
    }

    const errorMessage = ref("");
    const responseSuccess = ref(false);

    const handleBudgetAreasSave = () => {
      // check that all inputs are filled in
      let allFilled = true;
      store.state.data.budgetAreas.forEach((budgetArea) => {
        if (budgetArea.name === null || budgetArea.amount === null || budgetArea.dur === null) {
          allFilled = false;
        }
      });

      // don't update database if not all filled
      if (!allFilled) {
        // ! do error later
        errorMessage.value = "Fill Everything Out";
        return;
      }

      // update all start dates
      const temp = store.state.data;
      temp.budgetAreas.forEach((elt, i, arr) => {
        if (elt.dur === store.state.options.budgetAreas[0]) {
          arr[i].startDate = getFirstDayOfWeek(FIRSTMONDAY, 7);
        }
        else if (elt.dur === store.state.options.budgetAreas[1]) {
          arr[i].startDate = getFirstDayOfWeek(FIRSTMONDAY, 14);
        }
        else if (elt.dur === store.state.options.budgetAreas[2]) {
          arr[i].startDate = getFirstDayOfMonth();
        }
      });
      store.commit('setData', temp)

      // update database
      updateData(store, store.state.data).then((error) => {
        if (!error) { // no error
          errorMessage.value = "";
          responseSuccess.value = true;
          setTimeout(() => {
            responseSuccess.value = false;
          }, 1000);
        }
        else { // error
          errorMessage.value = "Error Saving to Database"
          console.log("Error: ", error);
        }
      });
    }

    const handleAddArea = () => {
      const temp = store.state.data;
      temp.budgetAreas.push({amount: null, name: null, dur: null, spent: [], undoStack: [], startDate: null});
      store.commit('setData', temp);
    }
    const handleRemoveArea = (areaid) => {
      const temp = store.state.data;
      temp.budgetAreas.splice(areaid, 1);
      store.commit('setData', temp);
    }


    return {
      store: computed(() => store.state),
      handleBudgetAreasSave,
      handleAddArea,
      handleRemoveArea,
      totalPercent: computed(() => getTotalPercent(store, props.durOptions)),
      totalIncomeUsed: computed(() => (getTotalPercent(store, props.durOptions) * store.state.data.incomeForPeriod / 100).toFixed(2)),
      errorMessage,
      responseSuccess
    }
  },
  props: ['durOptions'],
  components: {
    BudgetArea, Plus, Check
  }
}
</script>

<style scoped>
.budgetsContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 280px;
  margin: 0 20px 20px 20px;
  /*border: 1px solid #eaeaea;;*/
  /*padding: 30px;*/
  /*border-radius: 5px;*/
}

.budgetsTopContainerSize1 {
  position: sticky;
  top: 60px;
  z-index: 100;
}

.budgetsTopContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 2px 4px rgb(38 96 136 / 20%);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.budgetsTitle {
  font-size: 22px;
  font-weight: 600;
}

.budgetsErrorMessage {
  text-align: center;
  color: red;
}

.responseSuccessButton {
  color: green;
  width: 26px;
  height: 26px;
  margin-right: 10px;
}

.budgetContainer {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
}

.budgetAddButton {
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
  height: 220px;
  margin: 0;
  padding: 0;
}
.budgetAddButton:hover {
  box-shadow: -0.5px 4px 4px rgb(21 51 71 / 20%);
  transform: translate(0.5px, -2px);
}
.budgetAddButton:active {
  box-shadow: -0.5px 4px 4px rgb(21 51 71 / 20%);
  transform: translate(0.5px, -2px);
  background-color: #c3d5e0;
}

@media only screen and (max-width: 550px) {
  .budgetContainerNumContains {
    grid-template-columns: repeat(1, minmax(0, 100vw));
  }
  .budgetsTopContainerSize2 {
    width: 116%;
    transform: translate(-8%, 0);
  }
  .budgetAddButton {
    height: auto !important;
    padding: 15px 0;
  }
}
@media only screen and (min-width: 550px) and (max-width: 820px) {
  .budgetContainerNumContains {
    grid-template-columns: repeat(2, minmax(0, 100vw));
  }
  .budgetsTopContainerSize2 {
    width: 108%;
    transform: translate(-4%, 0);
  }
}
@media only screen and (min-width: 820px) and (max-width: 1100px) {
  .budgetContainerNumContains {
    grid-template-columns: repeat(3, minmax(0, 100vw));
  }
  .budgetsTopContainerSize2 {
    width: 106%;
    transform: translate(-3%, 0);
  }
}
@media only screen and (min-width: 1100px) {
  .budgetContainerNumContains {
    grid-template-columns: repeat(4, minmax(0, 100vw));
  }
  .budgetsTopContainerSize2 {
    width: 104%;
    transform: translate(-2%, 0);
  }
}
</style>