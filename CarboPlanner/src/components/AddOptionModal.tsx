import React, { useState } from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions, Pressable, Image} from 'react-native';
import ManuallyAdd from "./ManualAddFoodModal";
import VerticalLine from './VerticalLine';

const windowWidth = Dimensions.get('window').width;

const AddOptionModal = ({saveItem}) => {
    const [isVisible, setIsVisible] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
      setIsModalVisible(true);
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };

    const closeAddOptionModal = () => {
        setIsVisible(false);
    };

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.overButtonText}>{"Did your food not register?"}</Text>
            <TouchableOpacity style={styles.addFoodButton} onPress={toggleModal}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,}}>
                    <View style={styles.plusIconContainer}>
                        <Image source={require("../../assets/icons/plusGray.png")} style={styles.plusIcon} resizeMode="contain" />
                    </View>
                    <Text style={styles.buttonText}>{"Add Food"}</Text>
                </View>
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
                            <TouchableOpacity style={styles.option} onPress={openModal}>
                                <Image source={require("../../assets/func-icon/plus.png")} style={styles.icon} resizeMode="contain" />
                            </TouchableOpacity>
                            <ManuallyAdd saveItem={saveItem} modalVisible={isModalVisible} closeModal={closeModal} selectedItem={undefined} updateItem={undefined} itemToDelete={undefined} uuid={undefined} closeAddOptionModal={closeAddOptionModal} />
                        </View>
                        <VerticalLine/>
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Upload from Camera</Text>
                            <TouchableOpacity style={styles.option} onPress={toggleModal}>
                                <Image source={require("../../assets/icons/camera.png")} style={styles.icon} resizeMode="contain" />
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
        width: '55%',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#45505B',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    overButtonText: {
        fontSize: 10,
        textAlign: 'center',
        color: '#45505B',
        fontWeight: "400",
        fontStyle: 'italic',
        paddingBottom: 10,
    },
    addFoodButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 9,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginBottom: 1,
        borderWidth: 2,
        borderColor: '#65CB2E',
        borderStyle: "dashed",
    },
    option: {
        backgroundColor: '#65CB2E',
        width: windowWidth * 0.13,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 2,
        padding: 5,
        borderRadius: (windowWidth * 0.13) / 2, // Half of the width for circular shape
    },
    optionText: {
        color: '#45505B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    plusIconContainer: {
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: '100%',
        height: '100%',
    },
    icon: {
        width: '100%',
        height: '100%',
    },
});

export default AddOptionModal;
