import * as React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CalendarComponent from '../components/CalendarComponent';
import { useNavigation } from "@react-navigation/native";

export default function Calendar() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.goBackButton}>
                    <View style={styles.iconContainer}>
                        <Image source={require("../../assets/func-icon/left-arrow.png")} style={styles.icon} resizeMode="contain" />
                    </View>
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
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",

    },
    headerText: {
        fontSize: 30,
        color: "#45505B",
    },
    headerTextView: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: -50,
        marginLeft: -50,
    },
    greenLine: {
        height: 3,
        backgroundColor: '#65CB2E',
    },
    iconContainer: {
        width: 25,
        height: 25,
    },
    icon: {
        width: '100%',
        height: '100%',
    }
});
