import * as React from 'react';
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
    const navigation = useNavigation();

    // Navigate to Loading screen after a delay (simulate loading)
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('Loading');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}
