import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarComponent from '../components/CalendarComponent';
import { useNavigation } from "@react-navigation/native";

export default function Calendar() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.goBackButton}>
                    <Text style={styles.goBackText}>{'<'}</Text>
                </TouchableOpacity>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Calendar</Text>
                </View>
            </View>
            <View style={styles.greenLine} />
            <CalendarComponent />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    goBackButton: {
        marginRight: 0,
    },
    goBackText: {
        color: "#45505B",
    },
    headerText: {
        fontSize: 30,
        color: "#45505B",
    },
    headerTextView: {
        flex: 1,
        alignItems: 'center',
    },
    greenLine: {
        height: 3,
        backgroundColor: '#65CB2E',
    },
});
