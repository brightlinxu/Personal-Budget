<template>
  <h3>Budget Period:</h3>
  <button :class='{ activeColor: period ===  options[0]}' @click='handleClick(options[0])'>1 Week</button>
  <button :class='{ activeColor: period === options[1] }' @click='handleClick(options[1])'>2 Weeks</button>
  <button :class='{ activeColor: period === options[2] }' @click='handleClick(options[2])'>1 Month</button>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { updateData } from '../firebase/functions.js';

export default {
  setup() {
    const store = useStore();

    const options = store.state.options.budgetPeriod;

    const handleClick = (e) => {
      updateData(store, { budgetPeriod: e });
    }

    return {
      handleClick,
      period: computed(() => store.state.data.budgetPeriod),
      options
    }
  }
}
</script>

<style scoped>
.activeColor {
  background-color: lightblue;
}
</style>