import React from 'react';
import { View, Button } from 'react-native';
import database from '@react-native-firebase/database';
import {db} from "../utils/Database/databaseConfig"
import { setDoc, doc, collection } from 'firebase/firestore';


export default function ProfileScreen() {

  let today = new Date();

  let date = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()
  const mainDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, date);
  const subDocument = collection(mainDocRef, "Subdocument")
  const data = 
    [
      "value1",
      "value2",
      "value3"
    ]
  ;

  const createData = async () => {
    await setDoc(mainDocRef, {
      date: date
    })
    await setDoc(doc(subDocument, "subdoc"), {
      data
    })
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Save Data" onPress={createData} />
    </View>
  );
};
