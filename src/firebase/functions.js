import { updateDoc, doc } from 'firebase/firestore';
import { db } from './config.js';

const updateData = async (store, obj) => {
  // update user in database
  const docRef = doc(db, 'users', store.state.authData.uid);
  try {
    await updateDoc(docRef, obj);
    return false;
  }
  catch (error) {
    return error;
  }
}

export { updateData };