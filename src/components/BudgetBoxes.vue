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
      <div>
        You have no budget categories at the moment!
      </div>
      <div>
        Click <button :onclick="handleRouterClick" class="button-override">here</button> to add more
      </div>
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

.button-override {
  display: inline;
  margin: 0;
  padding: 0;
  color: #0284C7;
}
.button-override:hover {
  color: #0369A1;
}
</style>