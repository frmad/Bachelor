import {View, StyleSheet, TouchableOpacity, Text, Modal, Dimensions, Image} from 'react-native';
import * as React from "react";
import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import { deleteMeal } from '../utils/Database/DatabaseActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OptionButton(props: any) {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    const calculateModalPosition = () => {
        if (buttonRef.current) {
            buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
                const buttonPositionX = pageX;
                const buttonPositionY = pageY;

                setModalPosition({
                    top: buttonPositionY + 40,
                    left: buttonPositionX - 0,
                });
            });
        }
    };

    const edit = () => {
        navigation.navigate('Result', {uuidKey: props.uuidKey});};

    return (
        <View style={styles.container}>
            <TouchableOpacity
                ref={buttonRef}
                style={styles.dotsButton}
                onPress={() => {
                    toggleModal();
                    calculateModalPosition();
                }}
            >
                <View style={styles.optionIconContainer}>
                    <Image source={require("../../assets/func-icon/dots.png")} style={styles.optionIcon} resizeMode="contain" />
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
                    activeOpacity={1}
                    onPress={toggleModal}
                    style={styles.modalCloseContainer}
                />
                    <View style={[styles.modalContainer,modalPosition]}>
                        <TouchableOpacity ref={textRef}>
                            <Text style={styles.optionText}>Add food item</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity onPress={edit}>
                            <Text style={styles.optionText}>Edit food item</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity onPress={ () => {toggleModal(), deleteMeal( props.uuidKey)}}>
                            <Text style={styles.optionText}>Delete meal</Text>
                        </TouchableOpacity>
                    </View>
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
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent', // Make it transparent
    },
    modalContainer: {
        position: 'absolute',
        marginTop: '-10%',
        marginBottom: '10%',
        gap: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // This is for Android elevation
    },
    modalCloseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#45505B',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    dotsButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 1,
        paddingHorizontal: 2,
        borderRadius: 50,
        borderColor: '#C8C8C8',
        borderWidth: 1,
        textAlign: 'center',
        shadowColor: '#000', // For iOS
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // For Android
    },
    line: {
        backgroundColor: '#F0F1F1',
        width: '100%',
        height: 2,
        marginVertical: 10,
    },
    optionText: {
        fontSize: 12,
        color: "#45505B",
    },
    optionIconContainer: {
        width: 35,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionIcon: {
        width: '80%',
        height: '80%',
    },
});
