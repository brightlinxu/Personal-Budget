<template>
  <div class="loginContainerPosition">
    <div class="loginContainer">
      <div class="loginTitle">Login</div>
      <form @submit.prevent='handleSubmit' id="loginForm">
        <div class="loginFormContainer">
          <div class="loginInputContainer">
            <input class='floatingInput loginInput' type='text' placeholder='Email' name='Email' v-model='email' id="loginEmail">
            <label class="floatingLabel" data-content="Email" for="loginEmail"/>
          </div>
          <div>
            <input class='floatingInput loginInput' type='password' placeholder='Password' name='Password' v-model='password' id="loginPassword">
            <label class="floatingLabel" data-content="Password" for="loginPassword" />
          </div>
          <div v-if='error' class="loginError">{{ error }}</div>
        </div>
      </form>
    </div>
    <div class="loginBottomContainer">
      <button class='buttonStyle2 loginButton' type="submit" form="loginForm">Login</button>
      <div class="noAccountContainer">
        <span >Don't have an account?</span>
        <span class="noAccount" @click="handleNoAccountClick">Sign up</span>
      </div>
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
      if (email.value === '' ||
          password.value === '') {
        error.value = "Please fill in everything";
        return;
      }

      try {
        await store.dispatch('login', { 
          email: email.value, 
          password: password.value 
        });
        router.push('/budget');
      }
      catch (err) {
        console.log(err.message);
        error.value = "Invalid Email or Password";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.loginContainer {
  background: white;
  padding: 30px 30px 35px 30px;
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
  width: 250px;
  font-size: 15px;
}

.loginError {
  position: absolute;
  width: 250px;
  font-size: 13px;
  margin-top: 5px;
  color: red;
}

.loginBottomContainer {
  margin-top: -25px;
}

.loginButton {
  border-radius: 50px;
  padding: 15px;
  font-size: 15px;
  width: 200px;
  box-shadow: 0 4px 5px -2px rgba(3 105 161 / 0.5);
}

.noAccountContainer {
  text-align: center;
  font-size: 13px;
  margin-top: 20px;
}

.noAccount {
  color: #0369a1;
  cursor: pointer;
  margin-left: 5px;
}

.floatingLabel::before {
  color: #0369a1;
}
</style>