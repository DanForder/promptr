import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collectionGroup,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { generateGuid, getRandomIntInBounds } from "./utils";

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

    return {
      isSuccess: true,
    };
  } catch (e) {
    const error = getErrorMessageFromCode(e.code);
    return {
      isSuccess: false,
      error,
    };
  }
};

export const signInUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return {
      isSuccess: true,
    };
  } catch (e) {
    const error = getErrorMessageFromCode(e.code);
    return {
      isSuccess: false,
      error,
    };
  }
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const createPrompt = async (text, backgroundColor, submittedBy) => {
  const { uid } = auth.currentUser;
  const dateSubmitted = Timestamp.fromDate(new Date());
  const id = generateGuid();

  const docRef = doc(firestore, `users/${uid}/prompts/${id}`);
  setDoc(docRef, {
    text,
    backgroundColor,
    dateSubmitted,
    uid,
    id,
    submittedBy,
  });
};

// TODO: performance check here.. is getting a snapshot of all docs too expensive?
export const getRandomPrompt = async () => {
  const q = query(collectionGroup(firestore, "prompts"));
  const snapshot = await getDocs(q);
  const randomIndex = getRandomIntInBounds(0, snapshot.size - 1);

  return promptToJSON(snapshot.docs[randomIndex]);
};

// firebase util functions
export const promptToJSON = (doc) => {
  const data = doc.data();
  return {
    ...data,
    dateSubmitted: new Date(data.dateSubmitted.toMillis()).toLocaleString(),
  };
};

const getErrorMessageFromCode = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/user-not-found":
      return "No user with that email found";
    case "auth/wrong-password":
      return "Incorrect password entered";
    default:
      return code;
  }
};
