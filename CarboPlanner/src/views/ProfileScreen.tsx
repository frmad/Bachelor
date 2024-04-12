import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { db } from '../utils/Database/databaseConfig';
import { setDoc, doc, getDoc, arrayUnion, updateDoc, onSnapshot} from 'firebase/firestore';

export default function ProfileScreen() {
    const today = new Date();
    const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    const mainDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, date);

    useEffect(() => {
        const unsubscribe = onSnapshot(mainDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedData = snapshot.data().data;
                console.log("Data changed:", fetchedData[0].meals);
            } else {
                console.error("Document does not exist");
            }
        });
    
        return () => unsubscribe();
    }, [date]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {}}>
                <Text>CLICK ME!</Text>
            </TouchableOpacity>
            <Text>Profile!</Text>
        </View>
    );
}
