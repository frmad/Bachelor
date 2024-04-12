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

  const readData = async () => {
    try {
      const doc = await getDoc(mainDocRef);
      
      if (!doc.exists()) {
        console.error("Document does not exist");
        return null;
      }
  
      const data = doc.data();
      
      if (!data || !data.data) {
        console.error("Data is missing or invalid in the document");
        return null;
      }
      
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  export {createData, readData, mainDocRef};