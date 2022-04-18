<template>
  <div class='container'>
    <div v-if="store.data.budgetAreas.length > 0">
      <BudgetBox
        v-for='(elt, i) in store.data.budgetAreas'
        :key='i'
        :id='i'
      />
    </div>
    <div v-else>
      You have no budget categories at the moment!
    </div>
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