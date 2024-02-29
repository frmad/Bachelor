import * as React from 'react';
import { Camera as CameraMode } from 'expo-camera';
import { CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, Platform, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image, Pressable } from 'react-native';


export default function Camera(props: any){
  const [type, setType] = useState(CameraType.back);
  // @ts-ignore
  const [flashMode, setFlashMode] = useState(CameraMode.Constants.FlashMode.off);
  const [permission, requestPermission] = CameraMode.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const [camera, setCamera] = useState(null);

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

  function toggleFlashMode() {
     // @ts-ignore
    setFlashMode(c => (c === CameraMode.Constants.FlashMode.off ? CameraMode.Constants.FlashMode.torch : CameraMode.Constants.FlashMode.off));
  }
  
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      //console.log(data.uri);
      setImageUri(data.uri);
      fetchData(data.uri);
    }
  }

  

  const fetchData = async (base64Image) => {

    fetch('http://localhost:5000/v1/object-detection/yolov5s', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
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
          <Text style={styles.text}>{"<"}</Text>
        </Pressable>
        <Pressable onPress={toggleFlashMode} style={styles.button} >
          <Image source={require('../../assets/icons/lightning-bolt-filled.png')} style={{width: 32, height: 32}} />
        </Pressable>
      </View>

 
      {!imageUri && <View style={styles.cameraContainer}>
        <CameraMode
        flashMode={flashMode}
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>}
      
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}

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
  },
  fixedRatio: {
    aspectRatio: 1,
    height: "100%",
  },
  footer: {
    justifyContent: "center",
    margin: "auto",
    borderRadius: 0,
  }
});