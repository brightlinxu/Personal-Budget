<template>
  <h3>Budget Period:</h3>
  <button :class='{ activeColor: period === "1w" }' @click='handleClick("1w")'>1 Week</button>
  <button :class='{ activeColor: period === "2w" }' @click='handleClick("2w")'>2 Weeks</button>
  <button :class='{ activeColor: period === "1mo" }' @click='handleClick("1mo")'>1 Month</button>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { updateData } from '../firebase/functions.js';

export default {
  setup() {
    const store = useStore();


    const handleClick = (e) => {
      updateData(store, { budgetPeriod: e });
    }

    return {
      handleClick,
      period: computed(() => store.state.data.budgetPeriod)
    }
  }
}
</script>

<style>
.activeColor {
  background-color: lightblue;
}
</style>