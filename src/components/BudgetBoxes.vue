<template>
  <div class='container'>
    <BudgetBox v-for='(elt, i) in store.data.budgetAreas' :key='i' 
      :id='i' 
    />
  </div>
</template>

<script>
import { useStore } from 'vuex';
// import { computed } from 'vue';
import BudgetBox from './BudgetBox.vue';

export default {
  setup() {
    const store = useStore();

    return {
      store: store.state,
    }
  },
  components: {
    BudgetBox
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>