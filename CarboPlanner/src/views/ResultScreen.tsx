import {Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet, Button} from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {getCategory} from "../components/MealType";
import {getMacros} from "../components/Macros";
import {TextInput} from "react-native-paper";
import AddOptionModal from "../components/AddOptionModal";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import HorizontalLine from '../components/HorizontalLine';
import Carousel from "../components/Carousel";


export default function Result({route}) {

    const { base64 ,data, allImages} = route.params;

    const [item, setItem] = useState<Recognition[]>();

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const  mealMacros = getMacros();

    const [mealtype, setMealtype] = useState(getCategory());

    const [changeText, setChangeText] = useState(false);

    const [newText, setNewText] =  useState('');

    const image: any = "data:image/png;base64," + base64;

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    interface Recognition{
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
        confidence: number;
        class: number;
        name: String;
    }
    useEffect(()=> 
    setItem(data)
    )

    /**
     * Params for Yolov5
     * -----------------
     * name
     * Confindence
     * Ymin, Ymax
     * Xmin, XMax
     */

    const food = ({item} : {item : Recognition}) =>(
        <View style={styles.card}>
                        <Text>{item.name}</Text>
                        <Text>100g</Text>
                        <Text>{Math.round(100 * item.confidence)}%</Text>
                    </View>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    {/*
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.goBackButton} />
                        <View style={styles.resultHeaderContainer}>
                            <Text style={styles.resultHeaderText}>Result</Text>
                        </View>
                    </View>
                    */}
                    <Carousel {...allImages}/>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Card>
                        <View>
                            {/*Title*/}
                            {changeText ? ( // If changeText is true
                                <View>
                                    {showErrorMessage && (
                                        <Text style={styles.errorMessage}>Please enter a name for the meal</Text>
                                    )}
                                    <View style={styles.editView}>
                                        <TextInput
                                            onChangeText={setNewText}
                                            placeholder="Name for the meal"
                                            style={styles.input}
                                            underlineColorAndroid="#65CB2E" //only works on android
                                        />
                                        <TouchableOpacity onPress={() => {
                                            if (newText.trim() !== '') {
                                                setMealtype(newText);
                                                setChangeText(false);
                                                setShowErrorMessage(false);
                                            } else {
                                                setShowErrorMessage(true);
                                            }
                                        }} style={styles.goBackButton}>
                                            <Text>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : ( // If changeText is false
                                <View>
                                    <View style={styles.mealTitle}>
                                        <View style={styles.mealIconContainer}>
                                            <Image source={{}} style={styles.mealIcon} resizeMode="contain" />
                                        </View>
                                        <Text style={styles.title}>{mealtype}</Text>
                                        <TouchableOpacity onPress={() => {
                                            setChangeText(true);
                                            setNewText('');
                                        }} style={styles.goBackButton}>
                                            <View style={styles.editIconContainer}>
                                                <Image source={require("../../assets/icons/edit.png")} style={styles.editIcon} resizeMode="contain" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <HorizontalLine />
                                </View>
                            )}
                            {/*Macros are hard coded*/}
                            <View style={styles.macros}>
                                <Text style={styles.macroText}>Calories: {mealMacros.totalCalories}</Text>
                                <Text style={styles.macroText}>Carbs: {mealMacros.totalCarb}</Text>
                                <Text style={styles.macroText}>Fat: {mealMacros.totalProtein}</Text>
                                <Text style={styles.macroText}>Protein: {mealMacros.totalFat}</Text>
                            </View>
                            <HorizontalLine />
                        </View>
                        {/*Food cards*/}
                        <View style={styles.cardTitles}>
                            <Text style={styles.cardTitleText}>Name</Text>
                            <Text style={styles.cardTitleText}>Weight</Text>
                            <Text style={styles.cardTitleText}>Precision</Text>
                        </View>
                        <FlatList
                        style={{height: "20%"}}
                        data={item}
                        renderItem={food}
                        />
                        <View style={styles.buttonContainer}>
                            <AddOptionModal/>
                        </View>
                    </Card>
                    {/*save or cancel*/}
                    <View style={styles.saveOrCancel}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <Text style={{marginBottom: 5, marginTop: 5,}}>or</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
}

{/*
header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 30,
    },
    resultHeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
*/}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        
        fontSize: 40,
        color: "#45505B",
        marginRight: 80,
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // for Android elevation
    },
    macros: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    macroText: {
        
        fontSize: 12,
        color: "#45505B",
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    goBackButton: {
        backgroundColor: "#FFFFFF",
        padding: 25,
        justifyContent: "center",
        borderRadius: 50,
    },
    image: {
        width: "auto",
        height: 250,
        borderRadius: 25,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginVertical: '2%',
        marginHorizontal: '2%',
        marginTop: 30,
        marginBottom: 30,
    },
    saveOrCancel: {
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#65CB2E',
        paddingVertical: '2%',
        paddingHorizontal: '7%',
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 20,
    },
    saveButtonText: {
        
        color: 'white',
        fontSize: 6,
    },
    cancelButton: {
        width: "auto",
        justifyContent: "center",
    },
    cancelButtonText: {
        
        color: '#575757',
        fontSize: 4,
    },
    optionText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mealTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    mealIconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mealIcon: {
        width: '100%',
        height: '100%',
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    editIconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        width: '100%',
        height: '100%',
    },
    editView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#65CB2E',
        borderBottomWidth: 1,
    },
    cardTitles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 3,
        marginTop: 7,
    },
    cardTitleText: {
        
        fontSize: 12,
        color: "#45505B",
        textAlign: 'center',
        width: '33.33%',
    },
    itemName: {
        
        fontSize: 16,
        color: "#45505B",
    }
});