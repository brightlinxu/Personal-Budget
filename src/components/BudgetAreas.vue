<template>
  <div class="budgetsContainer">
    <div class="budgetsTopContainerSize1 budgetsTopContainerSize2">
      <div class="budgetsTopContainer">
        <div class="budgetsTitle">Budgets</div>
        <button type="submit" form="budgetsForm" class="buttonStyle2">Save</button>
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
import { computed } from 'vue';
import { updateData } from '../firebase/functions.js';
import BudgetArea from './BudgetArea.vue';
import { getTotalPercent, getFirstDayOfWeek, getFirstDayOfMonth } from '../utilities/calculations.js';
import Plus from 'vue-material-design-icons/Plus.vue'

export default {
  props: ['durOptions'],
  setup(props) {
    const store = useStore();
    const FIRSTMONDAY = {
      month: 1,
      day: 3,
      year: 2022
    }

    const handleBudgetAreasSave = () => {
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
      updateData(store, store.state.data);  
    }

    const handleAddArea = () => {
      const temp = store.state.data;
      temp.budgetAreas.push({amount: null, name: null, spent: [], undoStack: [], startDate: null});
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
    }
  },
  components: {
    BudgetArea, Plus
  }
}
</script>

<style scoped>
.budgetsContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 280px;
  margin: 20px;
  /*border: 1px solid #eaeaea;;*/
  /*padding: 30px;*/
  /*border-radius: 5px;*/
}

.budgetsTopContainerSize1 {
  position: sticky;
  top: 42px;
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
  margin: 20px 0;
}

.budgetsTitle {
  font-size: 22px;
  font-weight: 550;
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
}
@media only screen and (min-width: 550px) and (max-width: 820px) {
  .budgetsContainerNumContains {
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