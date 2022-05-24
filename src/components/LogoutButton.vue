<template>
  <div @click='handleClick' :class='{ buttonStyle: !usingCustomStyle, logoutButton: !usingCustomStyle }'>Logout</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  props: ['usingCustomStyle'],
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleClick = () => {
      store.dispatch('logout');
      router.push('/');
    }

    return {
      handleClick
    }
  }
}
</script>

<style scoped>
.logoutButton {
  margin: 0 3px;
}
</style>