import {Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet, Button, ScrollView} from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {getCategory, getCategoryIcon} from "../components/MealType";
import {getMacros} from "../components/Macros";
import {TextInput} from "react-native-paper";
import AddOptionModal from "../components/AddOptionModal";
import HorizontalLine from "../components/HorizontalLine";
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';
import {white} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function Loading({route}) {

    const { base64 ,data } = route.params;

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const  mealMacros = getMacros();

    const [mealtype, setMealtype] = useState(getCategory());

    const [changeText, setChangeText] = useState(false);

    const [newText, setNewText] =  useState('')

    const image: any = "data:image/png;base64," + base64;

    const mealIcon = getCategoryIcon();

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    /**
     * Params for Yolov5
     * -----------------
     * name
     * Confindence
     * Ymin, Ymax
     * Xmin, XMax
     */


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    {/*
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.goBackButton} />
                        <View style={styles.resultHeaderContainer}>
                            <Text style={styles.resultHeaderText}>Result</Text>
                        </View>
                    </View>
                    */}
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
                                            <Image source={mealIcon} style={styles.mealIcon} resizeMode="contain" />
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
                        {data.map((items, index) => {
                            return (
                                <View style={styles.card} key={index}>
                                    <Text style={styles.itemName}>{items.name}</Text>
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
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <Text style={{marginBottom: 5, marginTop: 5,}}>or</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        fontFamily: "Inter_700Bold",
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
        fontFamily: "Inter_300Light",
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
        fontFamily: "Inter_600SemiBold",
        color: 'white',
        fontSize: '6vw',
    },
    cancelButton: {
        width: "auto",
        justifyContent: "center",
    },
    cancelButtonText: {
        fontFamily: "Inter_600SemiBold",
        color: '#575757',
        fontSize: '4vw',
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
        fontFamily: "Inter_300Light",
        fontSize: 12,
        color: "#45505B",
        textAlign: 'center',
        width: '33.33%',
    },
    itemName: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 16,
        color: "#45505B",
    }
});