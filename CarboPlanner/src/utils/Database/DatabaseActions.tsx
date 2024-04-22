import {db} from "./databaseConfig"
import { setDoc, doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';


let today = new Date();

 

  let date = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()
  const mainDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, date);

  const data = {};

  const saveData = async (uuidKey, newData) => {
    if (!(await getDoc(mainDocRef)).exists()) {
      await setDoc(mainDocRef, {
        data
      });
    };
    //get exsisting data
    const docSnapshot = await getDoc(mainDocRef);
    const exsistingData = docSnapshot.data().data;

    //Add new data into the object 
    const updateData = {
      ...exsistingData, [uuidKey]: newData
    }

    //uopdate document with updated dat
    await updateDoc(mainDocRef, {
      data: updateData
    });
  };

  const edit = async (data, uuid) => {

    const docSnapshot = await getDoc(mainDocRef);
    if (docSnapshot.exists()) {
        const fetchedData = docSnapshot.data().data || [];

        // Update the data at the specific UUID
        fetchedData[uuid] = data;

        // Update the document with the changes
        await updateDoc(mainDocRef, { data: fetchedData });
    }
};


const deleteMeal = async (uuidKey) => {
  const docSnapshot = await getDoc(mainDocRef);
  const exsistingData = docSnapshot.data().data;

  const updateData = {...exsistingData}
  delete meal[uuidKey]

  //uopdate document with updated dat
  await updateDoc(mainDocRef, {
    data: updateData
  });
}


  export {saveData, mainDocRef, edit, deleteMeal};
  


