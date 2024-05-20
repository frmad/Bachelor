import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function CameraButton() {
    const navigation = useNavigation();
    function handlePress(){
        navigation.navigate('Camera');
    }
    return (
        <View style={styles.cameraButtonContainer}>
            <TouchableOpacity onPress={handlePress} style={styles.camera_button}>
                <View style={styles.plusIconContainer}>
                    <Image source={require("../../assets/func-icon/plus.png")} style={styles.plusIcon} resizeMode={"contain"} />
                </View>
            </TouchableOpacity>
        </View>
    )};

const styles = StyleSheet.create({
    camera_button: {
        backgroundColor: "#65CB2E",
        width: 65,
        height: 65,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraButtonContainer: {
        position: 'absolute',
        bottom: '2%',
        left: '50%',
        transform: [{ translateX: -22.5 }],
    },
    plusIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: '100%',
        height: '100%',
    },
});
