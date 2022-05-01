<template>
  <div class="loginContainerPosition">
    <div class="loginContainer">
      <div class="loginTitle">Login</div>
      <form @submit.prevent='handleSubmit'>
        <div class="loginFormContainer">
          <div class="loginInputContainer">
            <label>Email</label>
            <input class='loginInput' name='email' v-model='email'>
          </div>
          <div>
            <label>Password</label>
            <input class='loginInput' type='password' name='password' v-model='password'>
          </div>
          <div v-if='error' class="loginError">Invalid Email or Password</div>
        </div>
        <button class='buttonStyle2 loginButton'>Login</button>
      </form>
      <div class="noAccount" @click="handleNoAccountClick">Don't have an account?</div>
    </div>
  </div>
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

    const handleNoAccountClick = () => {
      router.push('/signup');
    }

    onMounted(() => {
      document.title = 'Login - Budget';
    });

    return {
      email,
      password,
      handleSubmit,
      error,
      handleNoAccountClick
    };
  }
}
</script>

<style scoped>
.loginContainerPosition {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.loginContainer {
  background: white;
  padding: 30px 30px 25px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgb(38 96 136 / 20%);
}

.loginTitle {
  font-size: 20px;
  font-weight: 600;
}

.loginFormContainer {
  margin: 30px 0 30px 0;
}

.loginInputContainer {
  margin-bottom: 20px;
}

.loginInput {
  border-color: lightgrey;
  border-radius: 5px;
  border-width: 1px;
  padding: 10px 5px;
  width: 200px;
}

.loginError {
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
  color: red;
}

.loginButton {
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