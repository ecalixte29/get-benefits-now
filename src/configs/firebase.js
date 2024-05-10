// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt1d_qOG3rEVgxLESZWjMIGeBRh0nnPzg",
  authDomain: "allied-premium-health.firebaseapp.com",
  projectId: "allied-premium-health",
  storageBucket: "allied-premium-health.appspot.com",
  messagingSenderId: "512012811400",
  appId: "1:512012811400:web:14f1909746de9804fa333d",
  measurementId: "G-9X7N9DWEC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
