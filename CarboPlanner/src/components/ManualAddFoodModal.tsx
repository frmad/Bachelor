import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { TextInput } from "react-native-paper";
import {LongInput, ShortInput} from '../components/TextInput';

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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={toggleModal}>
                {/*add icon*/}
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={toggleModal}
                onTouchStart={stopPropagation}
                statusBarTranslucent={true}
            >
                <TouchableOpacity onPress={toggleModal} style={styles.modalContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                                <View style={styles.macros}>
                                    <TouchableOpacity style={styles.topButton} onPress={toggleModal}>
                                        <Text style={styles.textButton}>{"<"}</Text>
                                    </TouchableOpacity>
                                    <Text style={{textAlign:"center", marginBottom:5, fontSize: 20, fontWeight: "bold"}}>Manually add food</Text>
                                    <TouchableOpacity style={[styles.topButton, {backgroundColor: "grey"}]}>
                                        <Text style={styles.textButton}>{"i"}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.bigWrapper}>
                                    <LongInput
                                        label="Name"
                                        onChange={onChangeName}
                                        affix=""
                                    />
                                </View>
                                <View style={styles.bigWrapper}>
                                    <LongInput
                                    label="Weight"
                                    keyboard="numeric"
                                    onChange={onChangeWeight}
                                    affix="| g"
                                    />
                                </View>

                                <View style={styles.bigWrapper}>
                                    <LongInput
                                    label="Calories"
                                    keyboard="numeric"
                                    onChange={onChangeCalories}
                                    affix="| kcal"
                                    />
                                </View>

                                <View style={styles.macros}>
                                    <ShortInput
                                    label="Carb"
                                    keyboard="numeric"
                                    onChangeText={onChangeCarb}
                                    affix="| g"
                                    />
                                    <ShortInput
                                    label="Protein"
                                    keyboard="numeric"
                                    onChangeText={onChangeProtein}
                                    affix="| g"
                                    />
                                    <ShortInput
                                    label="Fat"
                                    keyboard="numeric"
                                    onChangeText={onChangeFat}
                                    affix="| g"
                                    />
                                </View>
                                <TouchableOpacity style={styles.addFoodButton} onPress={toggleModal}>
                                    <Text style={{fontSize: 20, textAlign: "center", color:"white"}}>Save</Text>
                                </TouchableOpacity>
                        </TouchableOpacity>
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
        padding: 15,
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
    macros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    addFoodButton: {
        backgroundColor: '#65CB2E',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 50,
        marginBottom: 1,
        width: "50%"
    },
    textButton: {
        fontSize: 25,
        fontWeight: "bold", 
        textAlign: "center"
    },
    topButton: {
        borderRadius: 500, 
        width: 40, 
        alignContent: "center"
    }
});

export default ManuallyAddModal;
