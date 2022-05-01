<template>
  <div class="signupContainerPosition">
    <div class="signupContainer">
      <div class="signupTitle">Sign Up</div>
      <form @submit.prevent='handleSubmit'>
        <div class="signupFormContainer">
          <div class='signupInputContainer'>
            <label>First Name</label>
            <input class='signupInput' type='text' name='firstName' v-model='firstName'>
          </div>
          <div class='signupInputContainer'>
            <label>Last Name</label>
            <input class='signupInput' type='text' name='lastName' v-model='lastName'>
          </div>
          <div class='signupInputContainer'>
            <label>Email</label>
            <input class='signupInput' type='text' name='email' v-model='email'>
          </div>
          <div>
            <label >Password</label>
            <input class='signupInput' type='password' name='password' v-model='password'>
          </div>
          <div v-if='error' class="signupError">{{ error }}</div>
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
  height: 80vh;
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
  padding: 7px;
  width: 250px;
  font-size: 15px;
}

.signupError {
  width: 250px;
  font-size: 13px;
  margin-top: 10px;
  color: red;
}

.signupButton {
  width: 100%;
  border-radius: 40px;
  padding: 10px;
  font-size: 15px;
}
</style>