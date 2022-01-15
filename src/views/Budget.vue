<template>
  <div>Home page (Budget.vue)</div>
  <div v-if='store.authIsReady && store.dataIsReady'>
    <BudgetBoxes />
  </div>
</template>

<script>
import { useStore } from 'vuex';
// import { computed } from 'vue';
import BudgetBoxes from '../components/BudgetBoxes.vue';

export default {
  setup() {
    const store = useStore();

    return { 
      store: store.state,
    };
  },
  components: {
    BudgetBoxes
  }
}
</script>

<style>

</style>