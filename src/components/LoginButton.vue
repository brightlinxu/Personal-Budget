<template>
  <button @click='handleClick'>Login</button>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const handleClick = () => {
      router.push('/login');
    }

    return {
      handleClick
    }
  }
}
</script>

<style>

</style>