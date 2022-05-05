import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxetTpRXjlpUDwKSRoO9IidEP7_VERlV8",
  authDomain: "nwitter-58d4c.firebaseapp.com",
  databaseURL: "https://nwitter-58d4c-default-rtdb.firebaseio.com",
  projectId: "nwitter-58d4c",
  storageBucket: "nwitter-58d4c.appspot.com",
  messagingSenderId: "1085247193240",
  appId: "1:1085247193240:web:bbdb200519d4f3420890ed"
};



const firebaseApp = initializeApp(firebaseConfig);
export const authService = getAuth(firebaseApp);
export const dbService = getFirestore();
export const storageService = getStorage();