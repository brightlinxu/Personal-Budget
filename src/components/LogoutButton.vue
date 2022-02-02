<template>
  <div @click='handleClick' class='buttonStyle' style='margin: 0px 3px;'>Logout</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
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

<style>

</style>