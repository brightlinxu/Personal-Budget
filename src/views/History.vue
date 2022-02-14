<template>
  <h1>Spent History</h1>
  <div v-for='(elt, i) in history_arr' :key='i'>
    {{ elt }}
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { watch, ref } from 'vue';
// import { getMonthFromNum } from '../utilities/calculations.js'

export default {
  setup() {
    const store = useStore();

    const history_obj = ref({});
    const history_arr = ref([])

    watch(() => store.state.data && store.state.data.history, (cur) => {
      if (store.state.data) {
        cur.forEach((elt) => {
          const year_month = `${elt.startDate.year} ${elt.startDate.month}`;
          const sum = elt.spent.reduce((partial, cur) => {
            return partial + cur.amount;
          }, 0);
          if (year_month in history_obj.value) {
            history_obj.value[year_month] += sum;
          }
          else {
            history_obj.value[year_month] = sum
          }
          console.log(history_obj.value)
        });

        history_arr.value = Object.keys(history_obj.value).map((key) => [key, history_obj.value[key]]);
        history_arr.value.sort().reverse()
        console.log(history_arr.value)
      }
    });

    return {
      history_arr
    }
  }
}
</script>

<style>

</style>