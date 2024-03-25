import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ManuallyAdd from "./ManualAddFoodModal";

const windowWidth = Dimensions.get('window').width;

const AddOptionModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addFoodButton} onPress={toggleModal}>
                <Text>Add food item</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={toggleModal}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={toggleModal}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Manually add food</Text>
                            <ManuallyAdd></ManuallyAdd>
                        </View>
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Camera upload</Text>
                            <TouchableOpacity style={styles.option} onPress={toggleModal}></TouchableOpacity>
                        </View>
                    </View>
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
    addFoodButton: {
        backgroundColor: '#65CB2E',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        marginBottom: 20,
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
});

export default AddOptionModal;
