<template>
  <div class="settingsContainer">
    <div v-if='store.authIsReady && store.dataIsReady' class="sizeContainer">
      <h1>Settings</h1>
  <!--    <BudgetPeriod />-->
  <!--    <br />-->
      <div class="childContainer">
        <Incomes :freqOptions='incomeOptions'/>
        <BudgetAreas :durOptions='budgetAreaOptions'/>
      </div>
      <div>total percentage of income used: {{ totalPercent }}%</div>
  <!--    <div>income after tax for current budget period: ${{ store.data.incomeForPeriod }}</div>-->
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, watch, onMounted } from 'vue';
import Incomes from '../components/Incomes.vue';
// import BudgetPeriod from '../components/BudgetPeriod.vue';
import BudgetAreas from '../components/BudgetAreas.vue';
import { updateData } from '../firebase/functions.js';
import { getTotalPercent } from '../utilities/calculations.js';

export default {  
  setup() {
    const store = useStore();

    const incomeOptions = store.state.options.incomes;
    const budgetAreaOptions = store.state.options.budgetAreas;

    // watch for change in any store data
    watch(() => store.state.data && [store.state.data.budgetPeriod, store.state.data.yearlyTaxedIncome, store.state.data.budgetAreas], (cur) => {
      if (store.state.data) {
        const budgetPeriod = cur[0];
        const yearlyTaxedIncome = cur[1];
        let incomeForPeriod = 0;

        // find income for current period
        if (budgetPeriod === '1w') incomeForPeriod = (yearlyTaxedIncome / 52).toFixed(2);
        else if (budgetPeriod === '2w') incomeForPeriod = (yearlyTaxedIncome / 26).toFixed(2);
        else if (budgetPeriod === '1mo') incomeForPeriod = (yearlyTaxedIncome / 12).toFixed(2);

        // find total budget for current period
        const totalBudget = (getTotalPercent(store, budgetAreaOptions) * store.state.data.incomeForPeriod / 100).toFixed(2);

        // update the income for the current period in database
        updateData(store, {
          incomeForPeriod: incomeForPeriod,
          budget: totalBudget,
        });
      }
    });

    onMounted(() => {
      document.title = 'Settings - Budget';
    });


    return {
      store: computed(() => store.state),
      budgetAreaOptions,
      incomeOptions,
      totalPercent: computed(() => getTotalPercent(store, budgetAreaOptions)),
    }
  },
  components: {
    Incomes, /*BudgetPeriod,*/ BudgetAreas
  }
}
</script>

<style scoped>
.settingsContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sizeContainer {
  width: 800px;
}

.childContainer {
  display: flex;
  margin: 30px;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
}
</style>