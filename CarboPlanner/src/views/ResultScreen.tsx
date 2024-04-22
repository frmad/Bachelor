import {Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet} from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {getCategory} from "../components/MealType";
import {getMacros} from "../components/Macros";
import {TextInput} from "react-native-paper";
import AddOptionModal from "../components/AddOptionModal";
import { FlatList } from "react-native-gesture-handler";
import HorizontalLine from '../components/HorizontalLine';
import SaveConfirmationModal from "../components/SaveConfirmationModal";
import { createData, edit, mainDocRef } from "../utils/Database/DatabaseActions";
import uuid from 'react-native-uuid';
import ImageCarousel from "../components/ImageCarousel";;
import { Images } from "../utils/images";
import { getDoc } from "firebase/firestore";

export default function Result({route}) {

    const { base64 ,data, allImages} = route.params;

    const [items, setItem] = useState<Recognition[]>();

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const  mealMacros = getMacros();

    const [mealtype, setMealtype] = useState(getCategory());

    const [changeText, setChangeText] = useState(false);
    const [newText, setNewText] = useState(mealtype);

    const image: any = "data:image/png;base64," + base64;

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [foodList, setFoodList] = useState<Recognition[]>([]);

     const updateItem = (newItem) => {
        setItem([...items, newItem]);
      };


    interface Recognition{
        uuid : String;
        confidence: number;
        class: number;
        name: String;
        weight: Number;
        carbs: String;
        protein: String;
        fat: String;
    }

    const setInitialItem = async () => {
        let initialItems;

        if (data && data.length > 0 && (!items || !items.length)) {
            initialItems = data.map(item => ({
                ...item,
                // Set default values for properties other than confidence and name
                weight: '100',
                carbs: '33',
                protein: '12',
                fat: '8',
            }));
        }
        await setItem(initialItems);    
    };
    
    useEffect(() => {
        async function fetchData() {
          if (route.params.uuidKey) {
            const docSnapshot = await getDoc(mainDocRef);
      
            if (docSnapshot.exists()) {
              const fetchedData = docSnapshot.data().data || [];
      
              // Find the object with the matching UUID key
              const newItem = fetchedData[route.params.uuidKey];
      
              if (newItem) {
                // Update state with the new item's name and meals
                setNewText(newItem.name);
                setItem(newItem.meals);
              }
            }
          }
        }
      
        fetchData();
      }, [route.params.uuidKey]); // Include route.params.uuidKey in the dependency array
      

    useEffect(() => { 
        setInitialItem()
    }, [data]);



    const handleItemSet = () => {
        setFoodList([]);
        handleAddToList();
    };

    useEffect(() => {
        if (items && items.length) {
            handleItemSet();
        }
    }, [items]);
   
    const addToFoodList = (Recognition) => {
        setFoodList(prevList => [...prevList, Recognition]);
      };

      const handleAddToList = () => {
        if (items) {
          items.forEach(item => {
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

      const [isModalVisible, setIsModalVisible] = useState(false);
      
            //check for uuid prop, if found uuidKey variable points to the prop
      const uuidKey = route.params.uuidKey || String(uuid.v4());

      const saveData = () => {
        return { 
                name: newText,
                meals: foodList,
                icon: mealtype
            }
        };

    
    


    const handleSave = () => {
        createData(saveData);
        setIsModalVisible(!isModalVisible); // Show the confirmation modal
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

    //Handles which saving method touse
    const handleSaveButtonPress = () => {
        if (route.params.uuidKey) {
            edit(saveData(), uuidKey);
        } else {
            createData(uuidKey, saveData());
        }
      setIsModalVisible(!isModalVisible); // Show the confirmation modal
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    {route.params.uuidKey ? (
                    <View></View>
                    ):(
                        <ImageCarousel images={allImages} />
                    )}
                    <Card>
                        <View>
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
                                            placeholderTextColor={'#45505B'}
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
                                            <Text style={{ color: '#45505B'}}>Save</Text>
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
                                <View style={styles.macroItem}>
                                    <Text style={styles.macroTextHeader}>Total Kcal</Text>
                                    <Text style={styles.macroText}>{mealMacros.totalCalories} kcal</Text>
                                </View>
                                <View style={styles.macroItem}>
                                    <Text style={styles.macroTextHeader}>Total Carbs</Text>
                                    <Text style={styles.macroText}>{mealMacros.totalCarb} g</Text>
                                </View>
                                <View style={styles.macroItem}>
                                    <Text style={styles.macroTextHeader}>Total Protein</Text>
                                    <Text style={styles.macroText}>{mealMacros.totalProtein} g</Text>
                                </View>
                                <View style={styles.macroItem}>
                                    <Text style={styles.macroTextHeader}>Total Fat</Text>
                                    <Text style={styles.macroText}>{mealMacros.totalFat} g</Text>
                                </View>
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
                        style={{height: "23%", marginTop: 0, marginBottom: 0,}}
                        data={items}
                        renderItem={food}
                        />
                        <View style={styles.buttonContainer}>
                            <AddOptionModal {...{updateItem}}/>
                        </View>
                    </Card>
                    {/*save or cancel*/}
                    <View style={styles.saveOrCancel}>
                        <TouchableOpacity onPress={() => {handleSaveButtonPress()}} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                      
                        <SaveConfirmationModal isVisible={isModalVisible} />
                      
                        <Text style={{marginBottom: 2.5, marginTop: 2.5, fontWeight: '300',}}>or</Text>
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
        marginRight: "20%",
        fontWeight: 'bold',
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
        paddingHorizontal: 7,
        margin: 10,
    },
    macroText: {
        fontSize: 12,
        color: "#45505B",
        fontWeight: "bold",
    },
    macroTextHeader: {
        fontSize: 10,
        color: "#45505B",
        fontWeight: "300",
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
        paddingVertical: '0.7%',
        paddingHorizontal: '10%',
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: "700",
        letterSpacing: 1,
    },
    cancelButton: {
        width: "auto",
        justifyContent: "center",
    },
    cancelButtonText: {
        color: '#575757',
        fontSize: 13,
        fontWeight: '600',
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
        marginBottom: 2,
    },
    mealIconContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mealIcon: {
        width: '100%',
        height: '100%',
    },
    macroItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 1,
        marginTop: 6,
    },
    cardTitleText: {
        fontSize: 12,
        color: "#45505B",
        textAlign: 'center',
        width: '33.33%',
        fontWeight: '300',
    },
    cardTitle:{
        flexDirection: 'column',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 13,
        color: "#45505B",
        fontWeight: "bold",
    },
    itemCal: {
        fontSize: 11,
        color: "#45505B",
    },
    itemWeight: {
        fontSize: 10,
        color: "#45505B",
        borderColor: "#D9D9D9",
        borderWidth: 2,
        paddingTop: 7,
        padding: 4,
        borderRadius: 5,
        textAlign: 'center',
        lineHeight: 20,
        display: 'flex',
        justifyContent: 'center',
    },
    itemConfi: {
        fontSize: 11,
        color: "#45505B",
        borderColor: '#65CB2E',
        borderWidth: 2,
        paddingTop: 7,
        padding: 4,
        borderRadius: 20,
        textAlign: 'center',
        lineHeight: 20,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: "transparent",
    },
});