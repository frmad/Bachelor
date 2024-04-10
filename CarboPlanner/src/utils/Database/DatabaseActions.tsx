import {db} from "./databaseConfig"
import { setDoc, doc, collection } from 'firebase/firestore';

let today = new Date();

  let date = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()
  const mainDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, date);


  const data = [
    {
      id: 1232,
      name: "Pancakes",
      meals: [
        {
          name: "Item 1",
          weight: "432",
          calories: "320",
          carbs: "32",
          protein: "22",
          fat: "12",
        },
        {
          name: "Item 2",
          weight: "123",
          calories: "320",
          carbs: "32",
          protein: "22",
          fat: "12",
        },
      ],
      icon: "lunch",
    }
  ];

  const createData = async () => {
    await setDoc(mainDocRef, {
      data
    })
  };


  function save (prop : any) {




  }

  export {createData, save};