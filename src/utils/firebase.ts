import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
 
  const firebaseConfig = {
    apiKey: "AIzaSyB9TGMh1lV36Hs9c8GB-_zoxvvz6fUexeA",
    authDomain: "doctors-appointment-eac84.firebaseapp.com",
    projectId: "doctors-appointment-eac84",
    storageBucket: "doctors-appointment-eac84.appspot.com",
    messagingSenderId: "816590165820",
    appId: "1:816590165820:web:668f3a9ce504dbfe28f039"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
