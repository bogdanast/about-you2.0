// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh4WjkqY18xBnxJpvI0WBkaVXbD-dVRRQ",
  authDomain: "myreactapp-3ec0a.firebaseapp.com",
  projectId: "myreactapp-3ec0a",
  storageBucket: "myreactapp-3ec0a.appspot.com",
  messagingSenderId: "247444034531",
  appId: "1:247444034531:web:1900e03f3f1bf2f46946d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

//popup google auth
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//redirect google auth
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exist - create/set doc with the data from userAuth in my collection
  //if user data exists - return userDocRef
  if (!userSnapshot.exists()) {
    let { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("Error creating the user", err.message);
    }
  }
  return userDocRef;
};
