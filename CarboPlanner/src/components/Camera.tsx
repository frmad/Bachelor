import * as React from 'react';
import { Camera as CameraMode } from 'expo-camera';
import { CameraType } from 'expo-camera';
import {useRef, useState} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Simulate} from "react-dom/test-utils";
import emptied = Simulate.emptied;


const flashLogo = require('../../assets/icons/lightning-bolt-filled.png');

export default function Camera(props: any){
  const [type, setType] = useState(CameraType.back);
  // @ts-ignore
  const [flashMode, setFlashMode] = useState(CameraMode.Constants.FlashMode.off);
  const [permission, requestPermission] = CameraMode.useCameraPermissions();
  const [images, setImages] = useState([]);
  const [base64Images, setBase64] = useState([])
  const [resons, setRespons] = useState(null);
  const [camera, setCamera] = useState(null);
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);


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

      const data = await camera.takePictureAsync(options={base64:true});
      // Sets the Image URI to the data.uri (Base64)

      const base64 = 'data:image/png;base64,' + data.base64;

      setImages(prevImageUris => [...prevImageUris, base64]);


      // Splits the Base64 from the Type identifier made by Expo Camera, and sends the bare Base64 code
      //navigation.navigate('Loading', {base64: splitBase64String[1]});
    }
  }

  function splitBase64String (a) {
    return (a.split(",")[1])
  }


  const proceed = () => {
    const firstImageBase64 = splitBase64String(images[0]);
    const allImagesBase64 = images.map(uri => splitBase64String(uri)); //For each uri in the images array, it applies the splitBase64String function and stores the result in the allImagesBase64 array.
    navigation.navigate('Loading', { firstImageBase64, allImagesBase64 });
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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={navigation.goBack} style={styles.button} >
              <Text style={styles.goBackText}>{"<"}</Text>
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

          <View style={styles.bottomLeftContainer}>
            <ScrollView horizontal ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
              {images.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.imageInScroll} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <Pressable onPress={takePicture} style={styles.buttonCamera} >
              <Text style={styles.circle}></Text>
            </Pressable>
            <TouchableOpacity onPress={proceed} style={[styles.proceedButton, { display: images.length === 0 ? 'none' : 'flex' }]}>
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
  goBackText: {
    color: "white",
    borderRadius: 5,
    fontSize: 24,
  },
  circle : {
    padding: 20,
    borderRadius: 50,
    backgroundColor: "white",
  },
  buttonCamera: {
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 2,
  },
  button: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 17,
  },
  cameraContainer: {
    flexDirection: 'row',
    height: "77%",
    marginBottom: 15,
  },
  fixedRatio: {
    aspectRatio: 1,
    height: "100%",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  proceedButton: {
    position: 'absolute',
    right: 20,
    bottom: 13,
    borderRadius: 25,
    backgroundColor: '#65CB2E',
    paddingHorizontal: 20,
    width: "auto",
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  proceedText: {
      color: "white",
      fontSize: 18,
    },
  bottomLeftContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 10,
    marginLeft: 10,
    maxHeight: 100,
    width: '95%',
  },
  scrollViewContent: {
    alignItems: 'center', // Center the content horizontally
  },
  imageInScroll: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },

});
