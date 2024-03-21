import { Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {getCategory} from "../components/MealType";
import {getMacros} from "../components/Macros";

export default function Loading({route}) {

    const { base64 ,data } = route.params;

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const  mealMacros = getMacros();

    const mealtype = getCategory();

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
                    <TouchableOpacity onPress={() => {navigation.navigate('Home');}} style={styles.go_back_button} />
                    <View style={styles.resultHeaderContainer}>
                        <Text style={styles.resultHeaderText}>Result</Text>
                    </View>
                </View>


                <Image source={image} style={styles.image} />
                
                <Card>
                    <Text>{mealtype}</Text>

                    {data.map((items, index) => {
                        return (
                            <View key={index}>
                                <View style={styles.macros}>
                                    {/*Macros are hard coded*/}
                                    <Text>Calories:{mealMacros.totalCalories}</Text>
                                    <Text>Carbs:{mealMacros.totalCarb}</Text>
                                    <Text>Fat:{mealMacros.totalProtein}</Text>
                                    <Text>Protein:{mealMacros.totalFat}</Text>
                                </View>
                                <View style={styles.card}>
                                    <Text>{items.name}</Text>
                                    <Text>100g</Text>
                                    <Text>{Math.round(100 * items.confidence)}%</Text>
                                </View>
                            </View>
                            );
                            })}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Home');}} style={styles.add_food_button}>
                            <Text>Add Food</Text>
                        </TouchableOpacity>
                    </View>
                </Card>

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
    go_back_button: {
        backgroundColor: "#FFFFFF",
        padding: 25,
        justifyContent: "center",
        borderRadius: 50,
    },
    add_food_button: {
        backgroundColor: '#65CB2E',
        padding: 25,
        width: "auto",
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
});