<template>
  <div class='container'>
    <BudgetBox v-for='(elt, i) in store.data.budgetAreas' :key='i' 
      :id='i' 
    />
  </div>
  <div @click='redirectHistory'>History</div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// import { computed } from 'vue';
import BudgetBox from './BudgetBox.vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const redirectHistory = () => {
      router.push('history');
    }

    return {
      store: store.state,
      redirectHistory
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