import * as React from 'react';
import { Text, View } from 'react-native';
import {useEffect, useState} from "react";
import Loading from "./Loading";


export default function ProfileScreen(){
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call - should be changed for when using the loading screen
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}