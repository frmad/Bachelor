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
import { saveData, edit, mainDocRef, deleteMeal } from "../utils/Database/DatabaseActions";
import uuid from 'react-native-uuid';
import ImageCarousel from "../components/ImageCarousel";;
import { Images } from "../utils/images";
import { getDoc } from "firebase/firestore";
import ManuallyAdd from "../components/ManualAddFoodModal"


export default function Result({route}) {

    const { base64 ,data, allImages} = route.params;

    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedUuid, setSelectedUuid] = useState(null);

    const [uuids, setUuids] = useState([]);

    const [items, setItem] = useState<Recognition[]>([]);

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const  mealMacros = getMacros();

    const [mealtype, setMealtype] = useState(getCategory());

    const [changeText, setChangeText] = useState(false);
    const [newText, setNewText] = useState(mealtype);

    const image: any = "data:image/png;base64," + base64;

    const [showErrorMessage, setShowErrorMessage] = useState(false);


    const [isModalVisible, setIsModalVisible] = useState(false);

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
                const mealsObject = newItem.meals || {};

                // Get the keys of the meals object as an array of UUIDs
                const mealUuids = Object.keys(mealsObject);
      
                // Set the state with the meals object and the array of UUIDs
                setItem(mealsObject);
                setUuids(mealUuids);
              }
            }
          }
        }
      
        fetchData();
      }, [route.params.uuidKey]); // Include route.params.uuidKey in the dependency array


      useEffect(() => { 
        setInitialItem()
    }, [data]);

    useEffect(() => {
        if (selectedItem) {
            openModal();
        }
    }, [selectedItem,selectedUuid]);

    const openModal = () => {
      setIsModalVisible(true);
    };
  
    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };


    const saveItem = (newItem) => {
        const uuidKey = String(uuid.v4());
        setItem((prevItems) => ({
          ...prevItems,
          [uuidKey]: newItem,
        }));
        setUuids((prevUuids) => [...prevUuids, uuidKey]);
    };

      const updateItem = (uuidKey, updatedItem) => {
        setItem((prevItems) => ({
          ...prevItems,
          [uuidKey]: updatedItem,
        }));
    };


    const setInitialItem = async () => {
        let initialItems = {};
    
        if (data && data.length > 0 && (!items || !items.length)) {
            data.forEach(item => {
                const uuidKey = uuid.v4(); // Generate a UUID for the item
                const { /* Fields to keep */ confidence, name } = item;
                initialItems[uuidKey] = {
                    confidence,
                    name,
                    // Set default values for properties other than confidence and name
                    weight: '100',
                    carbs: '33',
                    protein: '12',
                    fat: '8'
                };
            });
        }
        await setItem(initialItems);
        setUuids(Object.keys(initialItems)); // Update uuids with the UUIDs of all items
    };
   
    


      //check for uuid prop, if found uuidKey variable points to the prop
      const uuidKey = route.params.uuidKey || String(uuid.v4());

      const createData = () => {
        return { 
                name: newText,
                meals: items,
                icon: mealtype
            }
        };

        interface Recognition{
            confidence: number;
            class: number;
            name: String;
            weight: Number;
            carbs: String;
            protein: String;
            fat: String;
        }
    


        const food = (uuidKey: string) => {
            const item = items[uuidKey]; // Look up the item using its UUID key
            if (!item) return null; // Return null if item is not found
          
            return (
              <TouchableOpacity onPress={() => handleFoodItemPress(item, uuidKey)}>
                <View style={styles.card}>
                  <View style={styles.cardTitle}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCal}>230cal</Text>
                  </View>
                  <Text style={styles.itemWeight}>100g</Text>
                  <Text style={styles.itemConfi}>{Math.round(100 * item.confidence)}%</Text>
                </View>
              </TouchableOpacity>
            );
          };

    //Handles which saving method touse
    const handleSaveButtonPress = () => {
        console.log("hello")
        if (route.params.uuidKey) {
            if(items.length === 0){
                deleteMeal(uuidKey)
                return
            }
            edit(createData(), uuidKey);
        } else {
            saveData(uuidKey, createData());
        }
    };

 const deleteItem = (itemToDeleteKey) => {
    const updatedItems = { ...items };

    // Check if the item to delete exists in the items object
    if (updatedItems.hasOwnProperty(itemToDeleteKey)) {
        // Use the JavaScript delete operator to remove the item
        delete updatedItems[itemToDeleteKey];
        // Set the updated items object using setItem
        setItem(updatedItems);
    } else {
        console.error('Item to delete does not exist');
    }
};

    

    const handleFoodItemPress = (item, uuid) => {    
        setSelectedItem(item); // Set the selected meal item when it's pressed
        setSelectedUuid(uuid)
    
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
                            style={{ height: "23%", marginTop: 0, marginBottom: 0 }}
                            data={uuids} // Use uuids array instead of items
                            renderItem={({ item }) => food(item)} // Pass the UUID key to the food function
                        />
                        <View style={styles.buttonContainer}>
                            <AddOptionModal saveItem={saveItem}/>
                        </View>
                    </Card>
                    {/*save or cancel*/}
                    <View style={styles.saveOrCancel}>
                        <TouchableOpacity onPress={() => {handleSaveButtonPress()}} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <Text style={{marginBottom: 5, marginTop: 5,}}>or</Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("Home")}} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <ManuallyAdd updateItem={updateItem} saveItem={saveItem} selectedItem={selectedItem} modalVisible={isModalVisible} closeModal={closeModal} itemToDelete={deleteItem} uuid={selectedUuid}/>
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