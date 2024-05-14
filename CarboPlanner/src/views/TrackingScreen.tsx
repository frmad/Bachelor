import * as React from 'react';

import {Text, TouchableOpacity, View, StyleSheet, FlatList, Image} from 'react-native';
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
import { maxCalories } from '../components/CircularSlider';


export default function TrackingScreen(){
  const navigation = useNavigation();

  function handlePress(){
    navigation.navigate('Camera');
  }

  function goToCalendar() {
    navigation.navigate('Calendar');
  }

  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(mainDocRef, (snapshot) => {
        if (snapshot.exists()) {
            const fetchedData = snapshot.data().data;
            setData(fetchedData);
        } else {
          setData([]);
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

    const [p, setProtein] = useState(0)
    let protein = 0;

    const [c, setCarbs] = useState(0)
    let carbs = 0;

    const [f, setFat] = useState(0)
    let fat = 0;

    const [cal, setCalories] = useState(0)
    let calories = 0;

    const totalMacros = (mealsArray: any) => {
        // Iterate over each meal in mealsArray
        Object.values(mealsArray).map(mealInfo => {
            // Update variables
            protein = protein+mealInfo.protein
            carbs = protein+mealInfo.carbs
            fat = protein+mealInfo.fat
            calories = protein+mealInfo.calories
        });

        setProtein(protein)
        setCarbs(carbs)
        setFat(fat)
        setCalories(calories)

        return {protein, carbs, fat, calories}
    };

    const renderMealItem = ({ item }) => {
      // deconstruct item into its key value pair
      const [uuidKey, meal] = item;
      const mealsArray = meal.meals // Access the meals array from the UUID object
      totalMacros(mealsArray)
      return (
        <List key={uuidKey} name={meal.name} imageURI={meal.icon} uuidKey={uuidKey} showOptions={true}>
          <HorizontalLine />
          {Object.values(mealsArray).map((mealInfo, index) => {
            // Extract the UUID from the mealInfo object
            const mealUuid = Object.keys(mealsArray)[index];
            return (
              <ListItem
                key={`${uuidKey}_${index}`} // Ensure each item has a unique key
                weight={mealInfo.weight}
                name={mealInfo.name}
                calories={mealInfo.calories}
                protein={mealInfo.protein}
                carbs={mealInfo.carbs}
                fat={mealInfo.fat}
              />
            );
          })}
        </List>
      );
    };

  return (
    <View style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={styles.header_text}>Today</Text>
      <TouchableOpacity onPress={goToCalendar}>
        <View style={styles.calendarIconContainer}>
          <Image source={require("../../assets/func-icon/calendar.png")} style={styles.calendarIcon} resizeMode="contain" />
        </View>
      </TouchableOpacity>
    </View>

      <Card>
        <View style={styles.row}>
          <CircularSlider value={Math.round(cal)} max={maxCalories}/>
        </View>
        <View style={styles.row}>
            <MacroProgressBar name={"Carbs"} value={Math.round(c)} max={Math.round((maxCalories*0.60)/4)} />

            <MacroProgressBar name={"Protein"} value={Math.round(p)} max={Math.round((maxCalories*0.3)/4)} />

            <MacroProgressBar name={"Fat"} value={Math.round(f)} max={Math.round((maxCalories*0.3)/9)} />
        </View>
      </Card>
        <Card customStyle={{maxHeight: "42%"}}>
            <FlatList
                data={Object.entries(data)}
                renderItem={renderMealItem}
                keyExtractor={(item) => item[0]} // Use the UUID as the key
            />
        </Card>
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
    calendarIconContainer: {
    backgroundColor: '#65CB2E',
    width: 40,
    height: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginLeft: 20,
    marginTop: 10,
  },
  calendarIcon: {
    width: '100%',
    height: '100%',
}});