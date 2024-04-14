import {db} from "./databaseConfig"
import { setDoc, doc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';

let today = new Date();

  let date = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()
  const mainDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, date);

  const data = [ ];

  const createData = async (newData) => {
    if (!(await getDoc(mainDocRef)).exists()) {
      await setDoc(mainDocRef, {
        data
      });
    };

    await updateDoc(mainDocRef, {
      data: arrayUnion(newData)
    });
  };

  export {createData, mainDocRef};
