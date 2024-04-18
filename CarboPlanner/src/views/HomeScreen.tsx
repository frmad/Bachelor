import * as React from 'react';

import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import Card from '../components/Card';
import CircularSlider from '../components/CircularSlider';
import List from '../components/List';
import ListItem from '../components/ListItem';
import MacroProgressBar from '../components/MacroProgressBar';
import HorizontalLine from '../components/HorizontalLine';
import CameraButton from "../components/CameraButton";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { mainDocRef } from '../utils/Database/DatabaseActions';

export default function HomeScreen(){
  const navigation = useNavigation();

  function handlePress(){
    navigation.navigate('Camera');
  }

  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(mainDocRef, (snapshot) => {
        if (snapshot.exists()) {
            const fetchedData = snapshot.data().data;
            console.log(data)
            setData(fetchedData);
        } else {
          setData(undefined)
        }
    });
}, []);
  

    interface mealItems{
      name: String
      weight: String
      calories: String
      protein: String
      fat: String
 
    }
  
    interface Meal{
      name: String
      meals: mealItems[]
      icon: String
    }

    interface mealItems{
      name: String
      weight: String
      calories: String
      protein: String
      fat: String
  
    }
  
    interface Meal{
      name: String
      meals: mealItems[]
      icon: String
    }

    const renderMealItem = ({ item }) => {

      //deconstruct item into its key valute pair 
      const [uuidKey, meal] = item; 
    
      // Ensure meal exsists
      if (!meal) {
        return null; 
      }
    
      const mealsArray = meal.meals || []; // Access the meals array from meal
    
      return (
        <List key={uuidKey} name={meal.name} imageURI={meal.icon} uuidKey={uuidKey}>
          <HorizontalLine />
          {mealsArray.map((meal, index) => (
            <ListItem
              key={`${uuidKey}_${index}`} // Ensure each item has a unique key
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
    };
   
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

      <ScrollView style={{paddingBottom: 10}}>
        <Card customStyle={{maxHeight: "100%"}}>
          <FlatList
            data={Object.entries(data)}
            renderItem={renderMealItem}
            keyExtractor={(item) => item[0]} // Use the UUID as the key
          />
        </Card>
      </ScrollView>

      <CameraButton />
    
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      gap: 10,
      backgroundColor: '#EBEBEB',
      height: '100%',
      paddingHorizontal: 5,
      paddingTop: 40,
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
});

