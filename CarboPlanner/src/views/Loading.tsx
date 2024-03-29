import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingIcon from "./LoadingIcon";

export default function Loading({route}) {
    const navigation = useNavigation();

    const { base64 } = route.params;

    const fetchData = async (base64) => {

        const requestBody = {
          image: base64
        };
    
        //Sends POST request to this URL, sends using the Base64 Image from the Expo Camera
        fetch('http://localhost:5000/v1/object-detection/yolov5s', {
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
          navigation.navigate('Result', {base64: base64, data: data});

          return data;
        })
        .catch(function(error) {
          return null;
        });
      };
    

    //Go back after some time
    useEffect(() => {
        fetchData(base64);  
    });

    return (
        <View style={styles.container}>
            <LoadingIcon />
            <Text style={styles.header}>Currently Loading Your Results...</Text>
            <Text style={styles.text}>This may take a minute</Text>
            <View style={styles.fact_view}>
                <Text style={styles.fact_header}>Did you know?</Text>
                <Text style={styles.fact_text}>An avocado contains more potassium than a banana!</Text>
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
    },
    header: {
        transformOrigin: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    text: {
        transformOrigin: 'center',
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
        transformOrigin: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    fact_text: {
        transformOrigin: 'center',
        color: 'white',
        marginTop: '1%',
        fontSize: 18,
        marginEnd: '5%',
        marginStart: '5%',
        textAlign: 'center',
    },
});
