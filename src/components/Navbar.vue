<template>
  <div class='container'>
    <a @click='handleRedirectHome'>Home</a>
    <div v-if='authIsReady && !authData' class='rightSide'> <!-- not logged in -->
      <LoginButton />
      <SignupButton />
    </div>
    <div v-else class='rightSide'> <!-- logged in -->
      <div v-if='dataIsReady && data'>Hi {{ data.firstName }}!</div>
      <div @click='handleRedirectSettings' style='margin: 0px 20px'>Settings</div>
      <LogoutButton />
    </div>
    
  </div>
</template>

<script>
import LoginButton from './LoginButton.vue';
import SignupButton from './SignupButton.vue';
import LogoutButton from './LogoutButton.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleRedirectHome = () => {
      if (store.state.authData === null) {
        // not logged in
        router.push('/');
      }
      // is logged in
      router.push('/budget');
    }

    const handleRedirectSettings = () => {
      router.push('/settings');
    }


    return {
      authData: computed(() => store.state.authData),
      authIsReady: computed(() => store.state.authIsReady),
      data: computed(() => store.state.data),
      dataIsReady: computed(() => store.state.dataIsReady),
      handleRedirectSettings,
      handleRedirectHome
    }
  },
  components: {
    LoginButton, SignupButton, LogoutButton
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 25px 12px;
}

.rightSide {
  display: flex;
}
</style>