// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG1QRYk2JSYICtduMIMumQ4YNrqlWqAfw",
  authDomain: "clevertouch-99e6a.firebaseapp.com",
  projectId: "clevertouch-99e6a",
  storageBucket: "clevertouch-99e6a.appspot.com",
  messagingSenderId: "560937402546",
  appId: "1:560937402546:web:64adab44ca17c68e6009ab",
  measurementId: "G-6BYNFT46JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export { storage} ;