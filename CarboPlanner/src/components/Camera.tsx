import * as React from 'react';
import { Camera as CameraMode } from 'expo-camera';
import { CameraType } from 'expo-camera';
import RNFetchBlob from 'rn-fetch-blob';
import { useState } from 'react';


import { Button, Platform, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image, Pressable } from 'react-native';
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


export default function Camera(){
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = CameraMode.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const [camera, setCamera] = useState(null);

  //Use Google Font (Inter)
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

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
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      //console.log(data.uri);
      setImageUri(data.uri);
      getInfo(data.uri);
    }
  }


  const getInfo = async (base64Image) => {

    fetch('http://localhost:5000/v1/object-detection/yolov5s', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Image,
      }),
      mode: "no-cors"
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed.');
      }
    })
    .then(function(data) {
      return data;
    })
    .catch(function(error) {
      return null;
    });
  };

  return (

    
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Pressable onPress={() => console.log("Back")} style={styles.button} >
          <Text style={styles.text}>{'<'}</Text>
        </Pressable>
        <Pressable onPress={() => console.log("Flash")} style={styles.button} >
          <Image source={require('../../assets/icons/lightning-bolt-filled.png')} style={{width: 32, height: 32}} />
        </Pressable>
      </View>

 
      {!imageUri && <View style={styles.cameraContainer}>
        <CameraMode
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>}
      
      <View style={styles.footer}>
        <Pressable onPress={takePicture} style={styles.button} >
          <Text style={styles.circle}></Text>
        </Pressable>
      </View>
      

      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
    zIndex: 10,
  },
  footer: {
    justifyContent: "center",
    margin: "auto",
    borderRadius: 0,
  }
});