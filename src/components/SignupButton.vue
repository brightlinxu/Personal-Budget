<template>
  <button @click='handleClick'>Signup</button>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const handleClick = () => {
      router.push('/signup');
    }

    return {
      handleClick
    }
  }
}
</script>

<style>

</style>