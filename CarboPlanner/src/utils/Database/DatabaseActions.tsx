import { useEffect, useState } from "react";
import {db} from "./databaseConfig"
import { setDoc, doc, getDoc, arrayUnion, updateDoc, onSnapshot } from 'firebase/firestore';

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

    console.log(newData)

    await updateDoc(mainDocRef, {
      data: arrayUnion(newData)
    });
  };

 const edit = async (data, uuid) => {
    if (!data || !uuid) {
        console.log("Data and UUID are required.");
        return;
    }

    const docSnapshot = await getDoc(mainDocRef);
    if (docSnapshot.exists()) {
        const fetchedData = docSnapshot.data().data || [];

        let index = -1; // Initialize index as -1

        fetchedData.forEach((obj, i) => {
            const key = Object.keys(obj)[0]; // Get the UUID key of the object

            if (key === uuid) {
                index = i; // Update the index if UUID matches
            }
        });

        if (index !== -1) {
            // Update the data at the found index with the provided data
            fetchedData[index][uuid] = data[uuid];
            console.log("Updated data:", fetchedData[index]);

            // Update the document with the changes
            await updateDoc(mainDocRef, { data: fetchedData });
            console.log("Document updated successfully.");
        } else {
            console.log("UUID key not found in data.");
        }
    } else {
        console.log("Document does not exist.");
    }
};

  export {createData, mainDocRef, edit};
  


