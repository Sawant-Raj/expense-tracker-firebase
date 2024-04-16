import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnCX0mjm-Uhts56l6CZ04wdOhQXI4E-iw",
  authDomain: "expense-tracker-60840.firebaseapp.com",
  projectId: "expense-tracker-60840",
  storageBucket: "expense-tracker-60840.appspot.com",
  messagingSenderId: "208209138263",
  appId: "1:208209138263:web:e8d7ff56a0e3e256dfc912"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export default auth;
