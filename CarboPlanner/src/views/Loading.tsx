import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingIcon from "./LoadingIcon";
import { Density, getReferencePoint, getVolume, getWeight } from '../utils/WeightEstimation';
import {getCameraPermissionsAsync} from "expo-camera";

export default function Loading({route}) {
    /*interface SizeValues {
      width: Number,
      height: Number,
    };*/

    const generateWeightAndMacro = (value: any[]) => {

      let listOfItems = new Map<string, number[]>;
      let listOfVolumes = new Map<string, number>;

        // TODO change to value when API is fixed
      data.map((element, index) => {
        if(!listOfItems.has(element["name"]+"-top")){
          listOfItems.set(element["name"]+"-top", [element["height"], element["width"]]);
          return;
        }
        if(!listOfItems.has(element["name"]+"-side")){
          listOfItems.set(element["name"]+"-side", [element["height"], element["width"]]);
          return;
        }
      });

      let reference = 0
      if (listOfItems.get('Credit Card'+'-top')||listOfItems.get('Credit Card'+'-side')){
          reference = getReferencePoint(listOfItems.get('Credit Card'+'-top')[1], listOfItems.get('Credit Card'+'-top')[0]); // cm^2
      }

        // Loop through each entry in the listOfItems map
        for (let [key, value] of listOfItems) {
            // Extract the item's name and view from the key
            const [name, view] = key.split("-");
            // Extract the item's height and width from the value
            const [height, width] = value;

            // Calculate volume based on the views
            if (view === "top" && name !== 'Credit Card') {
                // Retrieve the width of the item from the side view
                const sideWidth = listOfItems.get(name + "-side")?.[1] || 0;
                // Calculate the volume using height, width, and side width
                const volume = getVolume(height, width, sideWidth, reference); //cm^3
                // Store the calculated volume in the listOfVolumes map
                listOfVolumes.set(name, volume);
                //console.log(`Volume of ${name}:`, volume);
            }
        }
        // TODO change to value when API is fixed
        return calculateWeight(listOfVolumes, data);
    }

    // TODO delete
    const data = [
      {"class": 0, "name": "Chicken Breast", "x": 0, "y": 0, "width": 42, "height": 77,  "confidence": 0.2},
      {"class": 1, "name": "Credit Card",    "x": 0,  "y": 0,  "width": 21, "height": 37,  "confidence": 0.3},
      {"class": 0, "name": "Chicken Breast", "x": 0,  "y": 0,  "width": 41, "height": 60, "confidence": 0.4},
      {"class": 1, "name": "Credit Card",    "x": 0,  "y": 0,  "width": 22, "height": 38,  "confidence": 0.6},
        {"class": 0, "name": "Pasta", "x": 0,  "y": 0,  "width": 20, "height": 10, "confidence": 0.4},
        {"class": 1, "name": "Pasta",    "x": 0,  "y": 0,  "width": 27, "height": 34,  "confidence": 0.8},
    ];

    const calculateAverageConfidence = (data, foodName) => {
        // Object to store the average confidence and occurrence counts
        const nameAndConfidence = {};

        // Aggregate confidence values and occurrence counts
        data.forEach(({ name, confidence }) => {
            //Does the name exist in nameAndConfidence
            if (!nameAndConfidence[name]) {
                //If not, initialize an object containing totalConfidence and count
                nameAndConfidence[name] = { totalConfidence: 0, count: 0 };
            }
            //if the name exist add the confidence value to totalConfidence and increment count
            nameAndConfidence[name].totalConfidence += confidence;
            nameAndConfidence[name].count++;
        });

        // Calculate average confidence for each name
        const { totalConfidence, count } = nameAndConfidence[foodName] || { totalConfidence: 0, count: 0 };
        if (count !== 0 && foodName !== 'Credit Card') {
            const averageConfidence = totalConfidence / count;
            console.log(averageConfidence)
            return { foodName, averageConfidence };
        }
        return null;
    }

    const calculateWeight = (listOfVolumes: Map<string, number>, data: any) => {
        const listForSending = [];
        for (let [key, value] of listOfVolumes) {
            if (key !== 'Credit Card') {
                const name: string = key.replace(" ", "_");
                const weight = getWeight(value, Density[name]); // grams
                const result = {
                    name: calculateAverageConfidence(data, key)["foodName"],
                    confidence: calculateAverageConfidence(data, key)["averageConfidence"],
                    weight: weight,
                    calories: calculateMacros(name, weight)["calories"],
                    carbs: calculateMacros(name, weight)["carbs"],
                    fat: calculateMacros(name, weight)["fat"],
                    protein: calculateMacros(name, weight)["protein"]
                }
                console.log("hello",result.confidence)
                listForSending.push(result)
            }
        }
        return listForSending

        //name, confidence, weight, calories, carbs, fat, protein
        //Rice: cal:130 carbs:28 fat:1 protein:3
        //Pasta: cal:131 carbs:25 fat:1 protein:5
        //Spinach: cal:7 carbs:1 fat:0.1 protein:0.8
        //Chicken breast: cal:195 carbs:0 fat:7 protein:29
        //Peas: cal:117 carbs:20 fat:0.5 protein:7
    }

    const foodData = {
        "Rice": {
            "calories": 130,
            "carbs": 28,
            "fat": 1,
            "protein": 3
        },
        "Pasta": {
            "calories": 131,
            "carbs": 25,
            "fat": 1,
            "protein": 5
        },
        "Chicken_Breast": {
            "calories": 195,
            "carbs": 0.2,
            "fat": 7,
            "protein": 29
        },
        "Spinach": {
            "calories": 7,
            "carbs": 1,
            "fat": 0.1,
            "protein": 0.8
        },
        "Peas": {
            "calories": 117,
            "carbs": 20,
            "fat": 0.5,
            "protein": 7
        }
    };

    function getFoodItemData(foodItemName) {
        return foodData[foodItemName];
    }
    function calculateMacros(foodItemName, weight) {
        try {
            const foodItem = getFoodItemData(foodItemName);
            const calories = (weight/100)*foodItem.calories;
            const carbs = (weight/100)*foodItem.carbs;
            const fat = (weight/100)*foodItem.fat;
            const protein = (weight/100)*foodItem.protein;
            return { calories, carbs, fat, protein }; //object like macros = { calories, carbs, fat, protein };
        } catch (error) {
            console.log('No food item with that name');
            return null;
        }
    }

    /*
    const reference = getReferencePoint(data[1]["width"], data[1]["height"]); // cm^2
    console.log(reference + " cm^2");

    const volume = getVolume(data[0]["width"], data[0]["height"], data[2]["height"], reference); //cm^3
    const weight = getWeight(volume, Density.Chicken_Breast); // grams

    console.log("Volume of " + data[0]["name"] + ": " +  volume);

    console.log(weight + " g");
    */

    const funFacts = [
        "An avocado contains more potassium than a banana!",
        "Broccoli is high in fiber and vitamin C, and low in calories!",
        "Almonds are packed with healthy fats, protein, and fiber!",
        "Salmon is rich in omega-3 fatty acids, which are good for heart health!",
        "Spinach is a nutrient-rich leafy green vegetable that's low in calories!",
        "Blueberries are loaded with antioxidants and can help improve memory!",
        "Quinoa is a complete protein, containing all nine essential amino acids!",
        "Greek yogurt is a great source of protein and probiotics for gut health!",
        "Chia seeds are rich in fiber, omega-3 fatty acids, and antioxidants!",
        "Sweet potatoes are high in beta-carotene, which is good for eye health!",
    ];
    const getRandomFactIndex = () => {
        return Math.floor(Math.random() * funFacts.length);
    }

    const randomIndex = getRandomFactIndex();
    const randomFact = funFacts[randomIndex];

    const navigation = useNavigation();

    //const { base64 } = route.params;
    const { firstImageBase64, allImagesBase64 } = route.params;

    //const api_url = process.env.EXPO_PUBLIC_API_URL;

    const api_url : string = 'https://yolov5-flaskapi-5qhj5kt2ta-lz.a.run.app/v1/object-detection';
    //GAMLE - https://yolov5-flaskapi-5qhj5kt2ta-lz.a.run.app/v1/object-detection

    const fetchData = async (firstImageBase64) => {

        const requestBody = {
          image: firstImageBase64
        };

        //Sends POST request to this URL, sends using the Base64 Image from the Expo Camera
        fetch(api_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
        .then(function(response) {
          if (response.ok) {
            //TODO: make return with params to the result screen
            return response.json();
          } else {
            throw new Error('Request failed.');
          }
        })
        .then(function(data) {
          // The JSON data from the WebServer is returned here

            // TODO fix how we send the data to result - it should be used to make calculations based on the images - this should be sent (not data)
            const calculatedData = generateWeightAndMacro(data);
            navigation.navigate('Result', {base64: firstImageBase64, data: calculatedData, allImages: allImagesBase64});
        

          return data;
        })
        .catch(function(error) {
          return null;
        });
      };
    

    //Go back after some time
    useEffect(() => {
        fetchData(firstImageBase64);
    });

    return (
        <View style={styles.container}>
            <LoadingIcon />
            <Text style={styles.header}>Currently Loading Your Results...</Text>
            <Text style={styles.text}>This may take a minute</Text>
            <View style={styles.fact_view}>
                <Text style={styles.fact_header}>Did you know?</Text>
                <Text style={styles.fact_text}>{randomFact}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#65CB2E',
        padding: '13%',
        width: '100%',
    },
    header: {
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    text: {
        alignItems: 'center',
        color: 'white',
        marginTop: '1%',
        marginBottom: '10%',
        fontSize: 18,
        marginEnd: '5%',
        marginStart: '5%',
    },
    fact_view: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    fact_header: {
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    fact_text: {
        alignItems: 'center',
        color: 'white',
        marginTop: '1%',
        fontSize: 18,
        marginEnd: '5%',
        marginStart: '5%',
        textAlign: 'center',
    },
});
