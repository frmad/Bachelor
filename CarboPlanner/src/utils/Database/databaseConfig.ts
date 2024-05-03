import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const api_key = process.env.EXPO_PUBLIC_API_KEY; 

const firebaseConfig = {
  apiKey: api_key,
  authDomain: "carboplanner.firebaseapp.com",
  databaseURL: "https://carboplanner-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "carboplanner",
  storageBucket: "carboplanner.appspot.com",
  messagingSenderId: "300152421807",
  appId: "1:300152421807:web:ef0f16710f63b5186fc35a",
  measurementId: "G-6ZT5WEXNH0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get  firestore database
const db = getFirestore(app);


export {db}
