import * as React from 'react';


import { Button, Platform, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image, Pressable, FlatList, ScrollView } from 'react-native';
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
  
  const data = [
      {
        id: 0,
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
        icon: "lunch",
      },
      {
        id: 1,
        name: "Not Pancakes",
        icon: "midday",
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

    interface Meal{
      name: String
      weight: String
      calories: String
      protein: String
      fat: String
  
    }
  
    interface jsonData{
      name: String
      meals: Meal[]
      icon: String
    }

    const renderMealItem = ({ item }: { item: jsonData }) => (
      <List name={item.name} imageURI={item.icon}>
        <HorizontalLine />
        {item.meals.map((meal, index) => (
          <ListItem
            key={index.toString()} // Ensure each item has a unique key
            weight={meal.weight}
            name={meal.name}
            calories={meal.calories}
            protein={meal.protein}
            carbs="32" // Assuming the carbs value is fixed
            fat={meal.fat}
          />
        ))}
      </List>
    );

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

      <Card customStyle={{maxHeight: "44%"}}>
      <FlatList
        data={data}
        renderItem={renderMealItem}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
      />
    </Card>
      
      <View style={styles.cameraFunc}>
        <TouchableOpacity onPress={handlePress} style={styles.camera_button}>
          <Text style={styles.photo}>+</Text>
        </TouchableOpacity>
      </View>
      
      </View>
  );
}

const styles = StyleSheet.create({
  camera_button: {
    backgroundColor: "#65CB2E",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
      flex: 1,
      flexDirection: "column",
      gap: 10,
      backgroundColor: '#EBEBEB',
      height: '100%',
      paddingTop: 50,
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
  photo: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
  },
  cameraFunc: {
    flexDirection: "row",
    justifyContent: "center",
  },
});