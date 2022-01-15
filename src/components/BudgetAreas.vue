<template>
  <h3>Budget Areas:</h3>
  <button @click='handleAddArea'>Add Budget Area</button>
  <br />
  <br />
  <form @submit.prevent='handleBudgetAreasSave'>
    <BudgetArea v-for='(elt, i) in store.data.budgetAreas' :key='i'
      :id='i' :durOptions='durOptions' @removeArea='handleRemoveArea'
    />
    <button>Save</button>
  </form>
  <div>total percentage of income used: {{ totalPercent }}%</div>
  <div>total income used in budget period: ${{ totalIncomeUsed }} / ${{ store.data.incomeForPeriod }}</div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { updateData } from '../firebase/functions.js';
import BudgetArea from './BudgetArea.vue';
import { getTotalPercent } from '../utilities/calculations.js';

export default {
  props: ['durOptions'],
  setup(props) {
    const store = useStore();

    const handleBudgetAreasSave = () => {
      // update database
      updateData(store, store.state.data);  
    }

    const handleAddArea = () => {
      const temp = store.state.data;
      temp.budgetAreas.push({amount: null, name: null});
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
    BudgetArea
  }
}
</script>

<style>

</style>