<template>
  <form @submit.prevent='handleSubmit'>
    <h2>Sign Up</h2>
    <div class='individualContainer'>
      <label for="firstName">First Name:</label>
      <input type='text' name='firstName' v-model='firstName' required>
    </div>
    <div class='individualContainer'>
      <label for="lastName">Last Name:</label>
      <input type='text' name='lastName' v-model='lastName' required>
    </div>
    <div class='individualContainer'>
      <label for="email">Email:</label>
      <input type='email' name='email' v-model='email' required>
    </div>
    <div class='individualContainer'>
      <label for="password">Password:</label>
      <input type='password' name='password' v-model='password' required>
    </div>
    <button class='buttonStyle' style='margin: 20px 90px;'>Sign up</button>
    <div v-if='error'>{{ error }}</div>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await store.dispatch('signup', { 
          firstName: firstName.value,
          lastName: lastName.value,
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
      document.title = 'Signup - Budget';
    });

    return { firstName, lastName, email, password, handleSubmit, error };
  }
}
</script>

<style scoped>
.individualContainer {
  display: flex;
  justify-content: space-between;
  width: 240px;
  margin: 10px;
}
</style>