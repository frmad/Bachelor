import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Card from './Card';
import CircularSlider from './CircularSlider';
import MacroProgressBar from './MacroProgressBar';
import List from './List';
import HorizontalLine from './HorizontalLine';
import ListItem from './ListItem';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/Database/databaseConfig';
import { maxCalories } from './CircularSlider';

const GetData = ({ selectedDate }) => {
    const [data, setData] = useState({});

    /*
    doc: create a reference to a specific document in the Firestore database
    db: reference to the Firestore database instance
    EXPO_PUBLIC_UUID: used as a part of the path
    selectedDate: the date we want to retrieve data for from the Firestore database (part of the path to the specific document).
     */
    const calenderDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, selectedDate)

    useEffect(() => {
        /*
        onSnapshot: listens for changes to the Firestore document referenced by calenderDocRef - a change in the document, onSnapshot is executed
        If the document exist - it extracts the data from the snapshot using snapshot.data()
        If the snapshot/document doesn't exist, it sets the data state to an empty array - setData([]).
        unsubscribe - prevent unnecessary data fetching
        */
        const unsubscribe = onSnapshot(calenderDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedData = snapshot.data().data;
                //sets the data variable to the data fetched from the database
                setData(fetchedData);
            } else {
              setData([]);
            }
        });
    }, [selectedDate]); // Run the effect whenever selectedDate changes

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
        const [uuidKey, meal] = item;
        const mealsArray = meal.meals;
        totalMacros(mealsArray)
        return(
            <List key={uuidKey} name={meal.name} imageURI={meal.icon} uuidKey={uuidKey} showOptions={false}>
                <HorizontalLine />
                {Object.values(mealsArray).map((mealInfo, index) => (
                    <ListItem
                        key={`${uuidKey}_${index}`}
                        weight={mealInfo.weight}
                        name={mealInfo.name}
                        calories={mealInfo.calories}
                        protein={mealInfo.protein}
                        carbs={mealInfo.carbs}
                        fat={mealInfo.fat}
                    />
                ))}
            </List>
        )
    };

    return (

            <View style={styles.container}>
                { Object.keys(data).length > 0  ? (
            <>
                <Card customStyle={{maxHeight:"100%", ...styles.card}}>
                    <View style={styles.row}>
                        <CircularSlider value={Math.round(cal)} max={maxCalories}/>
                    </View>
                    <View style={styles.row}>
                        <MacroProgressBar name={"Carbs"} value={Math.round(c)} max={Math.round((maxCalories*0.6)/4)} />

                        <MacroProgressBar name={"Protein"} value={Math.round(p)} max={Math.round((maxCalories*0.3)/4)} />

                        <MacroProgressBar name={"Fat"} value={Math.round(f)} max={Math.round((maxCalories*0.3)/9)} />
                    </View>
                </Card>
                <Card customStyle={{maxHeight:"100%", ...styles.cardItems}}>
                        <FlatList
                            data={Object.entries(data)}
                            renderItem={renderMealItem}
                            keyExtractor={(item) => item[0]} // Use the UUID as the key
                        />
                    </Card></>
                ) : (
                    <View style={styles.center}>
                    <Text>No data found for this date</Text>
                    </View>
            )}
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
        paddingTop: 0,
        justifyContent: "center"
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-18%',
        marginBottom: 5,
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
        height: 50,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        marginLeft: 20,
        marginTop: 10,
    },
    calendarIcon: {
        width: '100%',
        height: '100%',
    },
    card: {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginHorizontal: -7,
        backgroundColor: 'white',
    },
    cardItems: {
        borderRadius: 20,
        marginHorizontal: -7,
        backgroundColor: 'white',
    },
});

export default GetData;
