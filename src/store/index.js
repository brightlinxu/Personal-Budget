import { createStore } from 'vuex'
import { auth, db } from '../firebase/config.js';
import { setDoc, getDoc, doc, /*onSnapshot*/ } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import router from '../router'

/*
what's in each object:

authData: {
  email,
  uid
}

data: {
  firstName: string,
  lastName: string,
  incomes: [{ amount, freq }]
}
*/

const store = createStore({
  state: {
    authData: null,
    authIsReady: false,
    data: null,
    dataIsReady: false,
    options: {
      budgetAreas: ['1 Week', '2 Weeks', '1 Month'],
      incomes: ['Weekly', 'Biweekly', 'Monthly'],
      budgetPeriod: ['1w', '2w', '1mo']
    }
  },
  mutations: { // synchronous code
    setAuthData(state, payload) {
      state.authData = payload;
      console.log('state.authData changed: ', payload);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
      console.log('state.authIsReady changed: ', payload);
    },
    setData(state, payload) {
      state.data = payload;
      console.log('state.data changed: ', payload);
    },
    setDataIsReady(state, payload) {
      state.dataIsReady = payload;
      console.log('state.dataIsReady changed: ', payload);
    }
  },
  actions: { // asynchronous code
    async signup(context, payload) {
      console.log('signup action');

      const res = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
      if (res) {
        context.commit('setAuthData', res.user);

        // create user profile in database
        console.log('added new user to database');
        const docRef = doc(db, 'users', res.user.uid);
        const data = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          incomes: [],
          budget: 0,
          budgetAreas: [],
          history: [],
          incomeForPeriod: 0,
        };
        await setDoc(docRef, data); // send data to database
        context.commit('setData', data); // send data to store
      }
      else {
        throw new Error('Could not complete signup');
      }
    },
    async login(context, payload) {
      console.log('login action');

      const res = await signInWithEmailAndPassword(auth, payload.email, payload.password);
      if (res) {
        context.commit('setAuthData', res.user);
        syncData();
      }
      else {
        throw new Error("Could not complete login");
      }
    },
    async logout(context) {
      console.log('logout action');

      await signOut(auth);
      context.commit('setAuthData', null);
      context.commit('setData', null);
    }
  }
});

const unsub = onAuthStateChanged(auth, (authData) => {
  store.commit('setAuthData', authData);
  store.commit('setAuthIsReady', true);
  store.commit('setDataIsReady', false);
  let url = window.location.pathname;
  if (authData) { // user is logged in
    syncData();
    // onSnapshot(doc(db, 'users', authData.uid), (snapshot) => {
    //   store.commit('setData', snapshot.data(), false);
    //   store.commit('setDataIsReady', true);
    // });
    
    // redirect user to '/budget'
    if (url === '/') {
      router.push('/budget');
    }
  }
  else { // user is not logged in
    // redirect user to '/'
    if (url !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
      router.push('/');
    }
  }
  
  unsub();
});

// manually sync everything in store.state.data with database
const syncData = () => {
  if (store.state.authData) {
    store.commit('setDataIsReady', false);
    const docRef = doc(db, 'users', store.state.authData.uid);
    getDoc(docRef)
      .then((snapshot) => {
        store.commit('setData', snapshot.data());
        store.commit('setDataIsReady', true);
      });
  }
}


export default store;