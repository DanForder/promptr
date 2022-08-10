import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdHtC25esyMzG0F4lwNbQKiW-UB-HuI8k",
  authDomain: "promptr-b0fc4.firebaseapp.com",
  projectId: "promptr-b0fc4",
  storageBucket: "promptr-b0fc4.appspot.com",
  messagingSenderId: "793241762649",
  appId: "1:793241762649:web:0ee6485572abd7e8762a48",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();

//create a user and a corresponding username in the firestore
export const createUser = async (user, username) => {
  const userRef = doc(firestore, "users", user.uid);
  const usernameRef = doc(firestore, "usernames", username);

  const batch = writeBatch(firestore);

  batch.set(userRef, {
    username,
    photoURL: user.photoURL,
    displayName: user.displayName,
  });
  batch.set(usernameRef, { uid: user.uid });

  await batch.commit();
};

export const checkUsernameValid = async (username) => {
  if (username.length < 3) return false;

  const docRef = doc(firestore, "usernames", username);
  return !(await getDoc(docRef)).exists();
};

export const signOut = async () => {
  await auth.signOut();
};

export const registerUser = async (displayName, email, password) => {
  try {
    // create auth user
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // create user in firestore
    const docRef = doc(firestore, "users", user.uid);

    await setDoc(docRef, {
      displayName,
      uid: auth.currentUser.uid,
      email,
    });

    return true;
  } catch ({ code, message }) {
    console.error(`Error code: ${code}. Error message: ${message}`);
    return false;
  }
};

export const signInUser = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (e) {
    console.log(e);
  }
};
