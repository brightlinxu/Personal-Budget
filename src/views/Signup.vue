<template>
  <div class="signupContainerPosition">
    <div class="signupContainer">
      <div class="signupTitle">Sign Up</div>
      <form @submit.prevent='handleSubmit'>
        <div class="signupFormContainer">
          <div class='signupInputContainer'>
            <label>First Name</label>
            <input class='signupInput' type='text' name='firstName' v-model='firstName' required>
          </div>
          <div class='signupInputContainer'>
            <label>Last Name</label>
            <input class='signupInput' type='text' name='lastName' v-model='lastName' required>
          </div>
          <div class='signupInputContainer'>
            <label>Email</label>
            <input class='signupInput' type='email' name='email' v-model='email' required>
          </div>
          <div>
            <label >Password</label>
            <input class='signupInput' type='password' name='password' v-model='password' required>
          </div>
          <div v-if='error'>{{ error }}</div>
        </div>
        <button class='buttonStyle2 signupButton'>Sign up</button>
      </form>
    </div>
  </div>
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
.signupContainerPosition {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

.signupContainer {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgb(38 96 136 / 20%);
}

.signupTitle {
  font-size: 20px;
  font-weight: 600;
}

.signupFormContainer {
  margin: 30px 0 30px 0;
}

.signupInputContainer {
  margin-bottom: 20px;
}

.signupInput {
  border-color: lightgrey;
  border-radius: 5px;
  border-width: 1px;
  padding: 10px 5px;
  width: 200px;
}

.signupError {
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
  color: red;
}

.signupButton {
  width: 100%;
  border-radius: 40px;
  padding: 10px;
  font-size: 15px;
}

.noAccount {
  text-align: center;
  font-size: 13px;
  color: #6b88b5;
  cursor: pointer;
  margin-top: 20px;
}
</style>