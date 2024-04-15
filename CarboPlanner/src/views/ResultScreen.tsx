import {Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet, Button} from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {getCategory} from "../components/MealType";
import {getMacros} from "../components/Macros";
import {TextInput} from "react-native-paper";
import AddOptionModal from "../components/AddOptionModal";
import { FlatList } from "react-native-gesture-handler";
import HorizontalLine from '../components/HorizontalLine';
import ImageCarousel from "../components/ImageCarousel";
import { createData } from "../utils/Database/DatabaseActions";
import { Images } from "../utils/images";


export default function Result({route}) {

    const { base64 ,data, allImages} = route.params;

    const [item, setItem] = useState<Recognition[]>();

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const  mealMacros = getMacros();

    const [mealtype, setMealtype] = useState(getCategory());

    const [changeText, setChangeText] = useState(false);

    const [newText, setNewText] =  useState(mealtype);

    const image: any = "data:image/png;base64," + base64;

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [foodList, setFoodList] = useState<Recognition[]>([]);

     const updateItem = (newItem) => {
        setItem([...item, newItem]);
      };


    interface Recognition{
        confidence: number;
        name: String;
        weight: String;
        carbs: String;
        protein: String;
        fat: String;
    }

    /**
     * Params for Yolov5
     * -----------------
     * name
     * Confindence
     * Ymin, Ymax
     * Xmin, XMax
     */

    const setInitialItem = async () => {
        if (data && data.length > 0 && (!item || !item.length)) {
            const initialItems = data.map(item => ({
                ...item,
                // Set default values for properties other than confidence and name
                weight: '100',
                carbs: '33',
                protein: '12',
                fat: '8',
            }));
            await setItem(initialItems);
        }
    };

    
    useEffect(() => { 
        setInitialItem()
    }, [data]);

    const handleItemSet = () => {
        setFoodList([]);
        handleAddToList();
    };

    useEffect(() => {
        if (item && item.length) {
            handleItemSet();
        }
    }, [item]);
    
    
    const addToFoodList = (Recognition) => {
        setFoodList(prevList => [...prevList, Recognition]);
      };

      const handleAddToList = () => {
        if (item) {
          item.forEach(item => {
            addToFoodList({
              name: String(item.name),
              weight: String(item.weight),
              carbs: String(item.carbs),
              protein: String(item.protein),
              fat: String(item.fat),
              confidence: String(item.confidence),
            });
          });
        }
      };

      const saveData = 
        {
          id: 1232,
          name: newText,
          meals: foodList,
          icon: mealtype,
        };

    const food = ({item} : {item : Recognition}) =>(
        <View style={styles.card}>
            <View style={styles.cardTitle}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCal}>230cal</Text>
            </View>
            <Text style={styles.itemWeight}>100g</Text>
            <Text style={styles.itemConfi}>{Math.round(100 * item.confidence)}%</Text>
        </View>
    )

    if (allImages.length !== 0) {
        console.log('not empty on result');
    } else {
        console.log('empty on result');
    }

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
                    <ImageCarousel images={allImages} />
                    {/*<Image source={{ uri: image }} style={styles.image} />*/}
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
                                            style={{width:"80%", backgroundColor: "white"}}
                                            theme={{roundness: 10}}
                                            activeUnderlineColor="#65CB2E"
                                            mode='flat'
                                            placeholder="Name for the meal"
                                            activeOutlineColor='black'
                                            onChangeText={setNewText}
                                            />
                                        <TouchableOpacity onPress={() => {
                                            if (newText.trim() !== '') {
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
                                            <Image source={Images[mealtype]} style={styles.mealIcon} resizeMode="contain" />
                                        </View>
                                        <Text style={styles.title}>{newText}</Text>
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
                        style={{height: "20%", marginTop: 10, marginBottom: 10}}
                        data={item}
                        renderItem={food}
                        />
                        <View style={styles.buttonContainer}>
                            <AddOptionModal {...{updateItem}}/>
                        </View>
                    </Card>
                    {/*save or cancel*/}
                    <View style={styles.saveOrCancel}>
                        <TouchableOpacity onPress={() => {createData(saveData)}} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <Text style={{marginBottom: 5, marginTop: 5,}}>or</Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("Home")}} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        color: "#45505B",
        marginRight: 70,
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
        margin: 10,
        height: 70,
    },
    goBackButton: {
        backgroundColor: "#FFFFFF",
        padding: 25,
        justifyContent: "center",
        borderRadius: 50,
    },
    image: {
        width: "auto",
        height: 220,
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
        fontSize: 12,
        fontWeight: "bold",
    },
    cancelButton: {
        width: "auto",
        justifyContent: "center",
    },
    cancelButtonText: {
        color: '#575757',
        fontSize: 10,
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
        width: 40,
        height: 40,
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
    cardTitle:{
        flexDirection: 'column',
    },
    itemName: {
        fontSize: 12,
        color: "#45505B",
        fontWeight: "bold",
    },
    itemCal: {
        fontSize: 10,
        color: "#45505B",
    },
    itemWeight: {
        fontSize: 10,
        color: "#45505B",
        borderColor: "#D9D9D9",
        borderWidth: 2,
        padding: 4,
        borderRadius: 5,
        textAlign: 'center',
        lineHeight: 20,
        display: 'flex',
        justifyContent: 'center',
    },
    itemConfi: {
        fontSize: 10,
        color: "#45505B",
        borderColor: '#65CB2E',
        borderWidth: 2,
        padding: 4,
        borderRadius: 20,
        textAlign: 'center',
        lineHeight: 20,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: "transparent",
    },
});