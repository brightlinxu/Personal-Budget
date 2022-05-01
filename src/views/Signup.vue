<template>
  <div class="signupContainerPosition">
    <div class="signupContainer">
      <div class="signupTitle">Sign Up</div>
      <form @submit.prevent='handleSubmit' id="signupForm">
        <div class="signupFormContainer">
          <div class='signupInputContainer'>
            <input class='floatingInput signupInput' type='text' placeholder='First Name' name='' v-model='firstName' id="signupFirstName">
            <label class="floatingLabel" data-content="First Name" for="signupFirstName"/>
          </div>
          <div class='signupInputContainer'>
            <input class='floatingInput signupInput' type='text' placeholder='Last Name' name='Email' v-model='lastName' id="signupLastName">
            <label class="floatingLabel" data-content="Last Name" for="signupLastName"/>
          </div>
          <div class='signupInputContainer'>
            <input class='floatingInput signupInput' type='text' placeholder='Email' name='Email' v-model='email' id="signupEmail">
            <label class="floatingLabel" data-content="Email" for="signupEmail"/>
          </div>
          <div>
            <input class='floatingInput signupInput' type='text' placeholder='Password' name='Password' v-model='password' id="signupPassword">
            <label class="floatingLabel" data-content="Password" for="signupPassword"/>
          </div>
          <div v-if='error' class="signupError">{{ error }}</div>
        </div>
      </form>
    </div>
    <div class="signupBottomContainer">
      <button class='buttonStyle2 signupButton' type="submit" form="signupForm">Sign up</button>
      <div class="hasAccountContainer">
        <span>Have an account?</span>
        <span class="hasAccount" @click="handleHasAccountClick">Login</span>
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
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      if (firstName.value === '' ||
          lastName.value === '' ||
          email.value === '' ||
          password.value === '') {
        error.value = "Fill in Everything";
        return;
      }

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
        console.log(err.message);

        // get user readable error message
        const errorCode = err.message.split(' ').pop().split('/')[1].slice(0, -2);
        let errorMessage;
        if (errorCode === 'invalid-email') {
          errorMessage = 'Please use a valid email'
        }
        else if (errorCode === 'weak-password') {
          errorMessage = 'Please use a password with at least 6 characters'
        }
        else if (errorCode === 'email-already-in-use') {
          errorMessage = 'You already have an account!'
        }
        else {
          errorMessage = "Error"
        }

        error.value = errorMessage;
      }
    }

    const handleHasAccountClick = () => {
      router.push('/login');
    }

    onMounted(() => {
      document.title = 'Signup - Budget';
    });

    return {
      firstName,
      lastName,
      email,
      password,
      handleSubmit,
      error,
      handleHasAccountClick
    };
  }
}
</script>

<style scoped>
.signupContainerPosition {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.signupContainer {
  background: white;
  padding: 30px 30px 35px 30px;
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
  width: 250px;
  font-size: 15px;
}

.signupError {
  position: absolute;
  width: 250px;
  font-size: 13px;
  margin-top: 5px;
  color: red;
}

.signupBottomContainer {
  margin-top: -25px;
}

.signupButton {
  border-radius: 50px;
  padding: 15px;
  font-size: 15px;
  width: 200px;
  box-shadow: 0 4px 5px -2px rgba(3 105 161 / 0.5);
}

.hasAccountContainer {
  text-align: center;
  font-size: 13px;
  margin-top: 20px;
}

.hasAccount {
  color: #0369a1;
  cursor: pointer;
  margin-left: 5px;
}

.floatingLabel::before {
  color: #0369a1;
}
</style>