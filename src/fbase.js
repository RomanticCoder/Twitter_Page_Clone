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

// initializeApp ( options :  Object ,  name ? :  string ) : App
// create and initialize a firebase app instance with the firebase configuration object
const firebaseApp = initializeApp(firebaseConfig);


// export declare function getAuth(app?: FirebaseApp): Auth;
// returns the Auth instance associatec with the provided firebaseApp
export const authService = getAuth(firebaseApp);

// Returns the existing Firestore instance that is associated with the provided FirebaseApp. 
// If no instance exists, initializes a new instance with default settings.
export const dbService = getFirestore();
export const storageService = getStorage();