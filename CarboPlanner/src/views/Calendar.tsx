import * as React from 'react';
import { Text, View } from 'react-native';
import CalendarComponent from '../components/CalendarComponent';

export default function Calendar(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Calendar!</Text>
            <CalendarComponent/>
        </View>
    );
}