<template>
  <h2>Login</h2>
  <form @submit.prevent='handleSubmit'>
    <label for="email">Email:</label>
    <br />
    <input type='email' name='email' v-model='email' required>
    <br />
    <br />
    <label for="password">Password:</label>
    <br />
    <input type='password' name='password' v-model='password' required>
    <br />
    <button class='buttonStyle' style='margin: 20px 40px;'>Login</button>
    <div v-if='error'>{{ error }}</div>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await store.dispatch('login', { 
          email: email.value, 
          password: password.value 
        });
        router.push('/budget');
      }
      catch (err) {
        error.value = err.message;
      }
    }

    onMounted(() => {
      document.title = 'Login - Budget';
    });

    return { email, password, handleSubmit, error };
  }
}
</script>

<style>

</style>