import { initializeApp } from 'firebase/app';
import { getFirestore/*, collection*/ } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyArPSYXem7wduUhAL286fwfaQffiJQf4L8",
  authDomain: "personal-budget-cc5af.firebaseapp.com",
  projectId: "personal-budget-cc5af",
  storageBucket: "personal-budget-cc5af.appspot.com",
  messagingSenderId: "997806140132",
  appId: "1:997806140132:web:0f703b8324abc921945af1",
  measurementId: "G-JB442PWJWH"
};

// intialize firebase
initializeApp(firebaseConfig);

// initialize firebase auth
const auth = getAuth()

const db = getFirestore();
// const usersColRef = collection(db, 'users');

export { auth, db };


/*
const getUsers = () => {
  getDocs(colRef)
  .then((snapshot) => {
    
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const addUser = (num) => { 
  addDoc(colRef, {
    uid: num
  });
}
*/


/*
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app.firestore();
*/