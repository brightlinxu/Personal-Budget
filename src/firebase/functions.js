import { updateDoc, doc } from 'firebase/firestore';
import { db } from './config.js';

const updateData = (store, obj) => {
  // update user in database
  const docRef = doc(db, 'users', store.state.authData.uid);
  updateDoc(docRef, obj);
  console.log('updated database');
}

export { updateData };