<template>
  <div v-if='store.authIsReady && store.dataIsReady'>
    <BudgetBoxes />
    <div @click='redirectHistory' class='historyContainer'>
      <div class='buttonStyle2' style='width: 51px;'>History</div>
    </div>
  </div>
  <div v-else class='loadingContainer'>
    <lottie-animation
      path='./loadingAnimation.json'
      :speed=1
      :width=1000
      :height=470
    />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import BudgetBoxes from '../components/BudgetBoxes.vue';
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const windowWidth = ref();

    const redirectHistory = () => {
      router.push('history');
    }

    onMounted(() => {
      document.title = 'Home - Budget';
      window.addEventListener('resize', handleWindowResize);
      handleWindowResize();
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowResize);
    });

    const handleWindowResize = () => {
      windowWidth.value = window.innerWidth;
    }

    return { 
      store: computed(() => store.state),
      redirectHistory,
      isPhoneWidth: computed(() => windowWidth.value < 735),
    };
  },
  components: {
    BudgetBoxes, LottieAnimation
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