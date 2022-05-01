<template>
  <div @click='handleClick' class='buttonStyle' style='margin: 0px 3px;'>Sign Up</div>
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