<template>
  <div v-if="store.data.budgetAreas.length > 0" class='container'>
    <BudgetBox
      v-for='(elt, i) in store.data.budgetAreas'
      :key='i'
      :id='i'
    />
  </div>
  <div v-else class='noBudgetsContainer'>
    <div>
      You have no budget categories at the moment!
    </div>
    <div>
      Click <button :onclick="handleRouterClick" class="button-inline-text">here</button> to add more
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import BudgetBox from './BudgetBox.vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleRouterClick = () => {
      router.push('/settings')
    }

    return {
      store: store.state,
      handleRouterClick
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

.noBudgetsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-inline-text {
  display: inline;
  margin: 0;
  padding: 0;
  color: #0284C7;
}
.button-inline-text:hover {
  color: #0369A1;
}
</style>