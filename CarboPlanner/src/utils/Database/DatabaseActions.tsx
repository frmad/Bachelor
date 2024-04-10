import {db} from "./databaseConfig"
import { setDoc, doc, collection, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';

let today = new Date();

  let date = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()
  const mainDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, date);

  const data = [ ];

  const createInitialDocument = async () => {
    const docSnapshot = await getDoc(mainDocRef);
    console.log(docSnapshot.exists());
    if (docSnapshot.exists()) {
      return;
    } else {
      await setDoc(mainDocRef, {
        data
      });
    }
  };

  const createData = async (newData) => {
    createInitialDocument()

    await updateDoc(mainDocRef, {
      data: arrayUnion(newData)
    });
  };


  export {createData};