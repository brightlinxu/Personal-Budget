<template>
  <h1>Spent History</h1>
  <div v-if='historyArr.length > 0'>
    <div class='spentContainer' v-for='(elt, i) in historyArr' :key='i'>
      <h3>
        {{ getMonthYearFromNum(elt[0]) }} {{ i === 0 ? '(in progress...)' : '' }}
      </h3>
      <div class='spentText'>Total Spent - ${{ elt[1].toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { getMonthYearFromNum } from '../utilities/calculations.js'

export default {
  setup() {
    const store = useStore();

    const getHistoryArr = () => {
      if (store.state.data) {
        let historyObj = {};
        store.state.data.history.forEach((elt) => {
          const yearMonth = `${elt.startDate.year} ${elt.startDate.month}`;
          const sum = elt.spent.reduce((partial, cur) => {
            return partial + cur.amount;
          }, 0);
          if (yearMonth in historyObj) {
            historyObj[yearMonth] += sum;
          }
          else {
            historyObj[yearMonth] = sum
          }
        });
  
        return Object.keys(historyObj).map((key) => [key, historyObj[key]]).sort().reverse()
      }
      return [];
    }


    return {
      historyArr: computed(() => getHistoryArr()),
      getMonthYearFromNum
    }
  }
}
</script>

<style scoped>
.spentContainer {
  margin: 40px 0px;
}
.spentText {
  margin-left: 10px;
}
</style>