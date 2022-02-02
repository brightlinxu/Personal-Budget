<template>
  <div v-if='store.authIsReady && store.dataIsReady'>
    <BudgetBoxes />
    <div @click='redirectHistory' class='historyContainer'>
      <div class='buttonStyle' style='width: 51px;'>History</div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// import { computed } from 'vue';
import BudgetBoxes from '../components/BudgetBoxes.vue';

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
    };
  },
  components: {
    BudgetBoxes
  }
}
</script>

<style scoped>
.historyContainer {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 30px;
}
</style>