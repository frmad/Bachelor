import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CalendarComponent from '../components/CalendarComponent';
import {green50} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { useNavigation } from "@react-navigation/native";

export default function Calendar(){
    const navigation = useNavigation();

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.goBackButton}>
                    <Text>{'<'}</Text>
                </TouchableOpacity>
                <Text>Calendar</Text>
            </View>
            <CalendarComponent/>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    goBackButton: {
        backgroundColor: '#65CB2E',
        padding: 10,
        justifyContent: "center",
        borderRadius: 20,
        marginRight: 20,
    },
});
