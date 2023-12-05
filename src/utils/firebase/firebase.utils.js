import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);
