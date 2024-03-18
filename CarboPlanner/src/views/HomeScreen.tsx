import * as React from 'react';
import Camera from '../components/Camera';


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
import Card from '../components/Card';
import CircularSlider from '../components/CircularSlider';
import MacroSlider from '../components/MacroProgressBar';
import List from '../components/List';
import ListItem from '../components/ListItem';
import MacroProgressBar from '../components/MacroProgressBar';
import HorizontalLine from '../components/HorizontalLine';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen(){
  const navigation = useNavigation();


  function handlePress(){
    navigation.navigate('Camera');
  }

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

  const data = [
      {
        name: "Pancakes",
        meals: [
          {
            name: "Item 1",
            weight: "432",
            calories: "320",
            carbs: "32",
            protein: "22",
            fat: "12",
          },
          {
            name: "Item 2",
            weight: "123",
            calories: "320",
            carbs: "32",
            protein: "22",
            fat: "12",
          },
        ],
        icon: "../../assets/flat-icons/lunch_bag.png",
      },
      {
        name: "Not Pancakes",
        icon: "../../assets/flat-icons/midday_lunch.png",
        meals: [
          {
            name: "Item 5",
            weight: "12 ",
            calories: "320",
            carbs: "32",
            protein: "22",
            fat: "12",
          },
          {
            name: "Item 3",
            weight: "123",
            calories: "320",
            carbs: "32",
            protein: "22",
            fat: "12",
          },
        ],
      },
    ];

  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Today</Text>

      <Card>
        <View style={styles.row}>
          <CircularSlider value={1200} max={2000}/>
        </View>
        <View style={styles.row}>
            <MacroProgressBar name={"Carbs"} value={0.5} max={210} />
          
            <MacroProgressBar name={"Protein"} value={1} max={180} />
          
            <MacroProgressBar name={"Fat"} value={0.2} max={200} />
        </View>
      </Card>

      <Card>
        {data.map((meals, index) => {
          return (
          <List name={meals.name} imageURI={meals.icon}>
            <HorizontalLine />
          
            {data[index].meals.map((items) => {
              return (
                <ListItem weight={items.weight} 
                          name={items.name} 
                          calories={items.calories} 
                          protein={items.protein} 
                          carbs={items.carbs} 
                          fat={items.fat} />
              );
            })}
            
          </List> 
          )
        })}

      </Card>
      
      <TouchableOpacity onPress={handlePress} style={styles.camera_button} />
      
      </View>
  );
}

const styles = StyleSheet.create({
  camera_button: {
      backgroundColor: "#FFFFFF",
      padding: 25,
      width: 25,
      justifyContent: "center",

      borderRadius: 50,
  },
  container: {
      flex: 1,
      flexDirection: "column",
      gap: 10,
      backgroundColor: '#EBEBEB',
      height: '100%',
  },
  center: {
    flex: 1,
    alignContent: "center",
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header_text: {
    fontFamily: "Inter_700Bold",
    fontSize: 40,
    marginLeft: "2%",
    paddingVertical: "1%",
    color: "#45505B",
  },
  column: {
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});