import {Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet, Button} from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {getCategory} from "../components/MealType";
import {getMacros} from "../components/Macros";
import {TextInput} from "react-native-paper";
import AddOptionModal from "../components/AddOptionModal";

export default function Loading({route}) {

    const { base64 ,data } = route.params;

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const  mealMacros = getMacros();

    const [mealtype, setMealtype] = useState(getCategory());

    const [changeText, setChangeText] = useState(false);

    const [newText, setNewText] =  useState('')

    const image: any = "data:image/png;base64," + base64;

    /**
     * Params for Yolov5
     * ----------------- 
     * name
     * Confindence
     * Ymin, Ymax
     * Xmin, XMax
     */


    return(
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Home');}} style={styles.goBackButton} />
                    <View style={styles.resultHeaderContainer}>
                        <Text style={styles.resultHeaderText}>Result</Text>
                    </View>
                </View>


                <Image source={image} style={styles.image} />

                <Card>
                    <View>
                        {/*Title*/}
                        {changeText ? ( // If changeText is true
                            <View>
                                <TextInput
                                    onChangeText={setNewText}
                                    placeholder="Name for the meal"
                                />
                                <TouchableOpacity onPress={() => {
                                    setChangeText(false);
                                    setMealtype(newText);
                                }} style={styles.goBackButton}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                        ) : ( // If changeText is false
                            <View>
                                <Text>{mealtype}</Text>
                                <TouchableOpacity onPress={() => {
                                    setChangeText(true);
                                }} style={styles.goBackButton}>
                                    <Text>Change Text</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/*Macros are hard coded*/}
                        <View style={styles.macros}>
                            <Text>Calories:{mealMacros.totalCalories}</Text>
                            <Text>Carbs:{mealMacros.totalCarb}</Text>
                            <Text>Fat:{mealMacros.totalProtein}</Text>
                            <Text>Protein:{mealMacros.totalFat}</Text>
                        </View>
                    </View>

                    {data.map((items, index) => {
                        return (
                                <View style={styles.card}>
                                    <Text>{items.name}</Text>
                                    <Text>100g</Text>
                                    <Text>{Math.round(100 * items.confidence)}%</Text>
                                </View>
                            );
                            })}

                    <View style={styles.buttonContainer}>
                        <AddOptionModal></AddOptionModal>
                    </View>
                </Card>

                {/*save or cancel*/}
                <View style={styles.saveOrCancel}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Home');}} style={styles.saveButton}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <p>or</p>
                    <TouchableOpacity onPress={() => {navigation.navigate('Home');}} style={styles.cancelButton}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
    );

}

const styles = StyleSheet.create({
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
    },
    saveOrCancel: {
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#65CB2E',
        padding: 25,
        width: "auto",
        justifyContent: "center",
        borderRadius: 50,
    },
    cancelButton: {
        backgroundColor: '#D9D9D9',
        padding: 25,
        width: "auto",
        justifyContent: "center",
        borderRadius: 50,
    },
    optionText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});