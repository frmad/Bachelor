import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { TextInput } from "react-native-paper";
import {LongTextInput, ShortTextInput} from '../components/TextInput';

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

    const onChangeWeight = (text) => {
        setCalories(parseInt(text) || 0);
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

    const element = <TextInput.Icon name="lock-outline" />

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={toggleModal}></TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={toggleModal}
                onTouchStart={stopPropagation}
                statusBarTranslucent={true}

            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={toggleModal}
                >
                    <View style={styles.modalContent}>
                            <View style={styles.macros}>
                                <TouchableOpacity style={{borderRadius: 500, width: 40, alignContent: "center"}} onPress={toggleModal}>
                                    <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center"}}>{"<"}</Text>
                                </TouchableOpacity>
                                <Text style={{textAlign:"center", marginBottom:5, fontSize: 20, fontWeight: "bold"}}>Manually add food</Text>
                                <TouchableOpacity style={{borderRadius : 500, backgroundColor: "grey", width: 40, alignContent: "center"}}>
                                    <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center"}}>{"i"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bigWrapper}>
                                <LongTextInput
                                    label="Name"
                                    onChangeText={onChangeName}
                                    affix=""
                                />
                            </View>
                            <View style={styles.bigWrapper}>
                                <LongTextInput
                                label="Weight"
                                onChangeText={onChangeWeight}
                                affix="| g"
                                />
                            </View>

                            <View style={styles.bigWrapper}>
                                <LongTextInput
                                label="Calories"
                                onChangeText={onChangeCalories}
                                affix="| kcal"
                                />
                            </View>

                            <View style={styles.macros}>
                                <ShortTextInput
                                label="Carb"
                                onChangeText={onChangeCarb}
                                affix="| g"
                                />
                                <ShortTextInput
                                label="Protein"
                                onChangeText={onChangeProtein}
                                affix="| g"
                                />
                                <ShortTextInput
                                label="Fat"
                                onChangeText={onChangeFat}
                                affix="| g"
                                />
                            </View>
                            
                            <TouchableOpacity style={styles.addFoodButton} onPress={toggleModal}>
                                <Text>Save</Text>
                            </TouchableOpacity>
                        
                        </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    bigWrapper: {
        width: "100%"
    },
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
        width: "90%",
        height: "60%",
        padding: 20,
        borderRadius: 20,
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
