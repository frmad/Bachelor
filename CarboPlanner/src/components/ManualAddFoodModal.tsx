import React, { useEffect, useState } from 'react';
import { Image, View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {LongInput, ShortInput} from '../components/TextInput';

const windowWidth = Dimensions.get('window').width;

const ManuallyAddModal = ({selectedItem, updateItem, modalVisible, closeModal, itemToDelete, saveItem, uuid, closeAddOptionModal}) => {
    
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carb, setCarb] = useState(0);
    const [weight, setWeight] = useState(0);
    

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name || "");
            setCalories("100")
            setFat(String(selectedItem.fat) || "0");
            setProtein(String(selectedItem.protein) || "0");
            setCarb(String(selectedItem.carbs) || "0");
            setWeight(String(selectedItem.weight) || "0");
        }
    }, [selectedItem]);

    const isInputEmpty = () => {
        // Check if name is empty or any other field is "0"
        if (
            name.trim().length === 0 ||
            calories === 0 ||
            fat === 0 ||
            protein === 0 ||
            carb === 0 ||
            weight === 0
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onSave = () => {
        if (isInputEmpty()) {
            // Display a message indicating that all fields must be filled
            alert('Please fill in all input fields.');
            return;
        }
        else {
            const newItem = {
                name: name.trim(),
                calories,
                fat,
                protein,
                carbs: carb,
                weight,
                confidence: 1
            };

            if (selectedItem) {
                updateItem(uuid, newItem);
            } else {
                saveItem(newItem);
            }
            closeModal();
            closeAddOptionModal();
        }
    };

    const onUpdate = () => {
        const newItem = {
            name: name,
            calories: calories,
            fat: fat,
            protein: protein,
            carbs: carb,
            weight: weight,
            confidence: 1
        };
            updateItem(uuid,newItem);
            toggleModal();  
    };

    const onDelete = () => {
        itemToDelete(uuid)
        toggleModal();
    } 

    const toggleModal = () => {
        closeModal();
    };

    const onChangeName = (text) => {
        setName(text);
    };

    const onChangeWeight = (text) => {
        setWeight(parseInt(text) || 0);
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
            
            <Modal
                key={selectedItem ? selectedItem.id : null}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
                onTouchStart={stopPropagation}
                statusBarTranslucent={true}
            >
                <TouchableOpacity onPress={toggleModal} style={styles.modalContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                                <View style={styles.macros}>
                                    <TouchableOpacity style={styles.topButton} onPress={toggleModal}>
                                        <Image source={require("../../assets/func-icon/left-arrow.png")} style={styles.icon} resizeMode="contain" />
                                    </TouchableOpacity>
                                    { selectedItem ? (
                                        <Text style={{textAlign:"center", color: "#45505B", marginBottom:5, fontSize: 20, fontWeight: "bold"}}>Change food item</Text>
                                    ) : (
                                    <Text style={{textAlign:"center", color: "#45505B", marginBottom:5, fontSize: 23, fontWeight: "bold"}}>Insert food item</Text>
                                    )
                                    }
                                    <TouchableOpacity style={[styles.topButton, {backgroundColor: "#EBEBEB"}]}>
                                        <Image source={require("../../assets/func-icon/info.png")} style={styles.icon} resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.bigWrapper}>
                                    <LongInput
                                        label="Name"
                                        onChange={onChangeName}
                                        affix=""
                                        value={name}
                                    />
                                </View>
                                <View style={styles.bigWrapper}>
                                    <LongInput
                                    label="Weight"
                                    keyboard="numeric"
                                    onChange={onChangeWeight}
                                    value={weight}
                                    affix="| g"
                                    />
                                </View>

                                <View style={styles.bigWrapper}>
                                    <LongInput
                                    label="Calories"
                                    keyboard="numeric"
                                    onChange={onChangeCalories}
                                    value={calories}
                                    affix="| kcal"
                                    />
                                </View>

                                <View style={styles.macros}>
                                    <ShortInput
                                    label="Carb"
                                    keyboard="numeric"
                                    onChangeText={onChangeCarb}
                                    value={carb}
                                    affix="| g"
                                    />
                                    <ShortInput
                                    label="Protein"
                                    keyboard="numeric"
                                    onChangeText={onChangeProtein}
                                    value={protein}
                                    affix="| g"
                                    />
                                    <ShortInput
                                    label="Fat"
                                    keyboard="numeric"
                                    onChangeText={onChangeFat}
                                    value={fat}
                                    affix="| g"
                                    />
                                </View>
                                { selectedItem ? (
                                        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: "100%"}}>
                                            <TouchableOpacity style={[styles.deleteFoodButton, {width:"35%"}]} onPress={onDelete}>
                                            <Text style={{fontSize: 20, textAlign: "center", color:"white", fontWeight: 600}}>Delete</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.addFoodButton, {width: "35%"}]} onPress={onUpdate}>
                                            <Text style={{fontSize: 20, textAlign: "center", color:"white", fontWeight: 600}}>Save</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <TouchableOpacity style={styles.addFoodButton} onPress={onSave}>
                                        <Text style={{fontSize: 20, textAlign: "center", color:"white", fontWeight: 600}}>Save</Text>
                                        </TouchableOpacity>
                                    )
                                    }
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
    deleteFoodButton: {
        backgroundColor: '#F35353',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 50,
        marginBottom: 1,
        width: "50%"
    },
    textButton: {
        fontSize: 25,
        fontWeight: "bold", 
        textAlign: "center",
        color: "#45505B",
    },
    topButton: {
        borderRadius: 500, 
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
});

export default ManuallyAddModal;
