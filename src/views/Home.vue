<template>
<div >
  <div>Welcome to my budgeting app!</div>
  <br />
  <div>The development is still in progress. Although it's usable, I'm currently adding some more features, and the UI isn't finished.</div>
  <br />
  <div>Login or Signup to give it a try!</div>
</div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();

    return {
      store: computed(() => store.state)
    }
  }
}
</script>

<style>

</style>