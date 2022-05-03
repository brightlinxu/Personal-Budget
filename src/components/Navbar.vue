<template>
  <div :class='{ fixedContainer: true, fixedContainerAfterScroll: scrollPosition > 20}'>
    <div class='nav-bar-container'>
      <div @click='handleRedirectHome' class='buttonStyle'>Home</div>
      <div v-if='authIsReady && !authData' class='rightSide'> <!-- not logged in -->
        <LoginButton />
        <SignupButton />
      </div>
      <div v-else class='rightSide'> <!-- logged in -->
        <div v-if='dataIsReady && data' style='margin: 5px 13px;'>Hi {{ data.firstName }}!</div>
        <div @click='handleRedirectSettings' class='buttonStyle' style='margin: 0px 3px;'>Settings</div>
        <LogoutButton />
      </div>
    </div>
  </div>
</template>

<script>
import LoginButton from './LoginButton.vue';
import SignupButton from './SignupButton.vue';
import LogoutButton from './LogoutButton.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const scrollPosition = ref();

    const handleRedirectHome = () => {
      if (store.state.authData === null) {
        // not logged in
        router.push('/');
      }
      else {
        // is logged in
        router.push('/budget');
      }
    }

    const handleRedirectSettings = () => {
      router.push('/settings');
    }

    const updateScrollPosition = () => {
      scrollPosition.value = window.scrollY;
    }

    onMounted(() => {
      window.addEventListener('scroll', updateScrollPosition);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScrollPosition);
    });

    return {
      authData: computed(() => store.state.authData),
      authIsReady: computed(() => store.state.authIsReady),
      data: computed(() => store.state.data),
      dataIsReady: computed(() => store.state.dataIsReady),
      handleRedirectSettings,
      handleRedirectHome,
      scrollPosition
    }
  },
  components: {
    LoginButton, SignupButton, LogoutButton
  }
}
</script>

<style scoped>
.fixedContainer {
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 1000;
  transition: 0.3s;
  color: #333;
}
.fixedContainerAfterScroll {
  background-color: rgba(256, 256, 256, 0.95);
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
}

.nav-bar-container {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
}

.rightSide {
  display: flex;
}
</style>