import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from "react-native-paper";

const windowWidth = Dimensions.get('window').width;

const ManuallyAddModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carb, setCarb] = useState(0);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    const onChangeName = (text) => {
        setName(text);
    };

    const onChangeCalories = (text) => {
        setCalories(parseInt(text) || 0);
    };

    const onChangeFat = (text) => {
        setFat(parseInt(text) || 0);
    };

    const onChangeProtein = (text) => {
        setProtein(parseInt(text) || 0);
    };

    const onChangeCarb = (text) => {
        setCarb(parseInt(text) || 0);
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={toggleModal}></TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={toggleModal}
                onTouchStart={stopPropagation}

            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={toggleModal}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldText}>Manually add food</Text>
                            <View style={styles.field}> {/*use value={name} or value{calories.toString()} for the change food item modal*/}
                                <Text style={styles.fieldText}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeName}
                                    placeholder="Name"
                                    onTouchStart={stopPropagation}
                                />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.fieldText}>Calories</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeCalories}
                                    placeholder="Calories"
                                    keyboardType="numeric"
                                    onTouchStart={stopPropagation}
                                />
                            </View>
                            <View style={styles.macros}>
                                <View style={styles.field}>
                                    <Text style={styles.fieldText}>Fat</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeFat}
                                        placeholder="Fat"
                                        keyboardType="numeric"
                                        onTouchStart={stopPropagation}
                                    />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldText}>Protein</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeProtein}
                                        placeholder="Protein"
                                        keyboardType="numeric"
                                        onTouchStart={stopPropagation}
                                    />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldText}>Carbs</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeCarb}
                                        placeholder="Carbs"
                                        keyboardType="numeric"
                                        onTouchStart={stopPropagation}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addFoodButton} onPress={toggleModal}>
                                <Text>Save</Text>
                            </TouchableOpacity>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 370,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
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
    fieldText: {
        color: '#45505B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    fieldContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start', // Align fields to the left
    },
    field: {
        flex: 1,
        marginHorizontal: 5,
    },
    macros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        height: 40,
        width: '100%',
        maxWidth: 100,
        marginVertical: 5,
        borderWidth: 1,
        padding: 10,
    },
    addFoodButton: {
        backgroundColor: '#65CB2E',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        marginBottom: 20,
    },
});

export default ManuallyAddModal;
