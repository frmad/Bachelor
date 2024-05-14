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

    const [p, setP] = useState(0);
    const [f, setF] = useState(0);
    const [c, setC] = useState(0);


    const renderMealItem = ({ item }) => {
      // deconstruct item into its key value pair
      const [uuidKey, meal] = item;

      const mealsArray = meal.meals // Access the meals array from the UUID object

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
          <CircularSlider value={1200} max={2000}/>
        </View>
        <View style={styles.row}>
            <MacroProgressBar name={"Carbs"} value={c} max={210} />

            <MacroProgressBar name={"Protein"} value={p} max={180} />

            <MacroProgressBar name={"Fat"} value={f} max={200} />
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
        width: 45,
        height: 45,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 40,
        marginLeft: 20,
        marginTop: 10,
    },
  calendarIcon: {
    width: '100%',
    height: '100%',
}});