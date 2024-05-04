import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCxOZDhBRGIAFV9iSoNRA95b3ModMP3FBg",
  authDomain: "balaifinder-firebase.firebaseapp.com",
  projectId: "balaifinder-firebase",
  storageBucket: "balaifinder-firebase.appspot.com",
  messagingSenderId: "30840317408",
  appId: "1:30840317408:web:16aa27b384acdcfa33b785"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)