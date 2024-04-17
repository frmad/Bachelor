import * as React from 'react';

import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import Card from '../components/Card';
import CircularSlider from '../components/CircularSlider';
import List from '../components/List';
import ListItem from '../components/ListItem';
import MacroProgressBar from '../components/MacroProgressBar';
import HorizontalLine from '../components/HorizontalLine';
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
      const [uuidKey, uuidObject] = item; // Destructure the UUID key and object
      console.log('UUID Object:', uuidObject); // Log the uuidObject to see if it's defined
    
      // Ensure uuidObject is defined before accessing its properties
      if (!uuidObject) {
        return null; // Return null if uuidObject is undefined
      }
    
      const mealsArray = uuidObject.meals || []; // Access the meals array from the UUID object
    
      return (
        <List key={uuidKey} name={uuidObject.name} imageURI={uuidObject.icon} uuidKey={uuidKey}>
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

      <Card customStyle={{maxHeight: "44%"}}>
      <FlatList
        data={Object.entries(data)}
        renderItem={renderMealItem}
        keyExtractor={(item) => item[0]} // Use the UUID as the key
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