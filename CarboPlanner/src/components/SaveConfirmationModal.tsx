import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CheckIcon from "./CheckIcon";
import {useNavigation} from "@react-navigation/native";

const SaveConfirmationModal = ({ isVisible }) => {
    const [isModalVisible, setIsModalVisible] = useState(isVisible);
    const navigation = useNavigation();
    function afterDelay(){
        navigation.navigate('Home');
    }

    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]); // when the isVisible prop changes, this ensures that the local state isModalVisible is updated

    useEffect(() => {
        if (isModalVisible) {
            const timeout = setTimeout(() => {
                setIsModalVisible(false);
                afterDelay();
            }, 3000); // Delay for 3 seconds

            return () => clearTimeout(timeout);
        }
    }, [isModalVisible]); // This useEffect will be triggered every time the isModalVisible state variable changes

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.circle}>
                        <CheckIcon />
                    </View>
                    <Text style={styles.bold}>Your meal has been saved!</Text>
                    <Text style={styles.regular}>Looks yummy</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
    },
    circle: {
        padding: 10,
        margin: 10,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "#65CB2E",
    },
    bold: {
        color: "#65CB2E",
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 10,
    },
    regular: {
        color: "#65CB2E",
        fontSize: 14,
        paddingTop: 2,
        paddingBottom: 15,
    },
});

export default SaveConfirmationModal;
