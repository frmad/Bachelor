import * as React from 'react';
import { Camera as CameraMode } from 'expo-camera';
import { CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const flashLogo = require('../../assets/icons/lightning-bolt-filled.png');

export default function Camera(props: any){
  const [type, setType] = useState(CameraType.back);
  // @ts-ignore
  const [flashMode, setFlashMode] = useState(CameraMode.Constants.FlashMode.off);
  const [permission, requestPermission] = CameraMode.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const [resons, setRespons] = useState(null);
  const [camera, setCamera] = useState(null);

  const navigation = useNavigation();


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    // Changes front or back camera
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleFlashMode() {
    // Toggles Camera Flash
     // @ts-ignore
    setFlashMode(c => (c === CameraMode.Constants.FlashMode.off ? CameraMode.Constants.FlashMode.torch : CameraMode.Constants.FlashMode.off));
  }
  
  const takePicture = async () => {
    // Check if the camera is available and not null, if true, 
    // it will use the takePictureAsync to take a picture and save it to the app's cache
    if (camera) {
      const data = await camera.takePictureAsync(null);
      // Sets the Image URI to the data.uri (Base64)
      setImageUri(data.uri);

      // Splits the Base64 from the Type identifier made by Expo Camera, and sends the bare Base64 code
      const splitBase64String: string[] = data.uri.split(',');

      fetchData(splitBase64String[1]);

      navigation.navigate('Loading', {base64: splitBase64String[1]});
    }
  }

  

  const fetchData = async (base64Image) => {

    const requestBody = {
      image: base64Image
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
        return response.json();
      } else {
        throw new Error('Request failed.');
      }
    })
    .then(function(data) {
      // The JSON data from the WebServer is returned here
      return data;
    })
    .catch(function(error) {
      return null;
    });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable onPress={navigation.goBack} style={styles.button} >
          <Text style={styles.text}>{"<"}</Text>
        </Pressable>
        
        <Pressable onPress={toggleFlashMode} style={styles.button} >
          <Image source={flashLogo} style={{width: 32, height: 32}} />
        </Pressable>
      </View>

      <View style={styles.cameraContainer}>
        <CameraMode
          flashMode={flashMode}
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>
      

      <View style={styles.footer}>
        <Pressable onPress={takePicture} style={styles.button} >
          <Text style={styles.circle}></Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "column",
    height: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle : {
    padding: 15,
    borderRadius: 50,
    backgroundColor: "white",
  },
  text: {
    color: "white",
    borderRadius: 5,
    fontSize: 24,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  cameraContainer: {
    flexDirection: 'row',
    height: "80%",
  },
  fixedRatio: {
    aspectRatio: 1,
    height: "100%",
  },
  footer: {
    justifyContent: "center",
    margin: "auto",
    borderRadius: 2,
  }
});