import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// crwn-clothing web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjYi74ae0-1i6zuBUwkXMhiYtPuUchgbU",
  authDomain: "crwn-clothing-db-2024.firebaseapp.com",
  projectId: "crwn-clothing-db-2024",
  storageBucket: "crwn-clothing-db-2024.appspot.com",
  messagingSenderId: "475870892341",
  appId: "1:475870892341:web:83fe44d0e3c0a079873c7c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Authentication utils
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

// Database related utils
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // if user data does not exist create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if user data exists just return the data
  return userDocRef;
};
