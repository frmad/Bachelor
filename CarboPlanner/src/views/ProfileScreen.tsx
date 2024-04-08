import * as React from 'react';
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Carousel from '../components/Carousel';

export default function ProfileScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Profile!</Text>
            <Carousel />
        </View>

    );
}
