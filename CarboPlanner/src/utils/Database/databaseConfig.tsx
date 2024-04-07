import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyALG_9tVJZnA42z927RgkGVIInZkjqGlhk",

  authDomain: "carboplanner.firebaseapp.com",

  databaseURL: "https://carboplanner-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "carboplanner",

  storageBucket: "carboplanner.appspot.com",

  messagingSenderId: "300152421807",

  appId: "1:300152421807:web:5096fa710d4b5a1a6fc35a",

  measurementId: "G-G1Z0NB2P0W"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export {db}
