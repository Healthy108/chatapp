import * as firebase from "firebase";
// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv8JI97KEBC_5vfMZR1bJJoY_TFOW6n2I",
  authDomain: "chatapp-f7689.firebaseapp.com",
  projectId: "chatapp-f7689",
  storageBucket: "chatapp-f7689.appspot.com",
  messagingSenderId: "883903020316",
  appId: "1:883903020316:web:7d584b4a78fcdce8278ed9",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
