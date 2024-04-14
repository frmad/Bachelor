import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import ManuallyAdd from "./ManualAddFoodModal";

const windowWidth = Dimensions.get('window').width;

const AddOptionModal = ({updateItem}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    const setFirstModal = () => {
        setIsVisible(false);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addFoodButton} onPress={toggleModal}>
                <Text style={styles.buttonText}>{"Add food item"}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={toggleModal}
                statusBarTranslucent={true}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={toggleModal}
                >
                    <TouchableOpacity activeOpacity={1}>
                    <View style={styles.modalContent}>
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Manually add food</Text>
                            <ManuallyAdd {...{updateItem}}/>
                        </View>
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Camera upload</Text>
                            <TouchableOpacity style={styles.option} onPress={toggleModal}>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 370,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 10,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    addFoodButton: {
        backgroundColor: '#65CB2E',
        paddingVertical: 10,
        paddingHorizontal: 2,
        borderRadius: 50,
        marginBottom: 1,
    },
    option: {
        backgroundColor: '#65CB2E',
        width: windowWidth * 0.13,
        aspectRatio: 1, // Ensures square shape
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        borderRadius: (windowWidth * 0.13) / 2, // Half of the width for circular shape
    },
    optionText: {
        color: '#45505B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddOptionModal;
