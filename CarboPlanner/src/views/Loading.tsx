import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingIcon from "./LoadingIcon";
import { Density, getReferencePoint, getVolume, getWeight } from '../components/WeightEstimation';

export default function Loading({route}) {



    const generateWeight = (data: [any]) => {
      interface SizeValues {
        width: Number,
        height: Number, 
      };

      let listOfItems = new Map<string, SizeValues>;

      data.map((element, index) => {
        if(!listOfItems.has(element["name"]+"-top")){
          listOfItems.set(element["name"]+"-top", {width: element["width"], height: element["height"]});
          return;
        }
        if(!listOfItems.has(element["name"]+"-side")){
          listOfItems.set(element["name"]+"-side", {width: element["width"], height: element["height"]});
          return;
        }
      });

      console.log("Image" + listOfItems.get("laptop-top").height.toString);
      return 0;
    }

    const data = [
      {"class": 0, "name": "Chicken Breast", "x": 0, "y": 0, "width": 42.54, "height": 77.12,  "confidence": 0},
      {"class": 1, "name": "Credit Card",    "x": 0,  "y": 0,  "width": 21.27, "height": 37.06,  "confidence": 0},
      {"class": 0, "name": "Chicken Breast", "x": 0,  "y": 0,  "width": 42.54, "height": 60.12, "confidence": 0},
      {"class": 1, "name": "Credit Card",    "x": 0,  "y": 0,  "width": 21.27, "height": 37.06,  "confidence": 0},
    ];

    const reference = getReferencePoint(data[1]["width"], data[1]["height"]); // cm^2
    console.log(reference + " cm^2");

    const volume = getVolume(data[0]["width"], data[0]["height"], data[2]["height"], reference); //cm^3
    const weight = getWeight(volume, Density.Chicken_Breast); // grams

    console.log("Volume of " + data[0]["name"] + ": " +  volume);

    console.log(weight + " g");


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

    const api_url = process.env.EXPO_PUBLIC_API_URL;

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

            //generateWeight(data);

            navigation.navigate('Result', {base64: firstImageBase64, data: data, allImages: allImagesBase64});
        

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
