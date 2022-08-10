import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, writeBatch } from "firebase/firestore";
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
