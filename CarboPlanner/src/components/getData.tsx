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

const GetData = ({ selectedDate }) => {
    const [data, setData] = useState({});

    const calenderDocRef = doc(db, process.env.EXPO_PUBLIC_UUID, selectedDate)

    useEffect(() => {
        console.log("hello")
        const unsubscribe = onSnapshot(calenderDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedData = snapshot.data().data;
                console.log(fetchedData)
                setData(fetchedData);
            } else {
              setData([]);
            }
        });
    }, [selectedDate]);


    const renderMealItem = ({ item }) => {
        const [uuidKey, meal] = item;
        const mealsArray = meal.meals;

        return(
            <List key={uuidKey} name={meal.name} imageURI={meal.icon} uuidKey={uuidKey}>
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
            <><Card customStyle={{maxHeight:"100%"}}>
                    <View style={styles.row}>
                        <CircularSlider value={1200} max={2000} />
                    </View>
                    <View style={styles.row}>
                        <MacroProgressBar name={"Carbs"} value={0.5} max={210} />
                        <MacroProgressBar name={"Protein"} value={1} max={180} />
                        <MacroProgressBar name={"Fat"} value={0.2} max={200} />
                    </View>
                </Card><Card customStyle={{maxHeight:"100%"}}>
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
        paddingTop: 40,
        justifyContent: "center"
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-18%'
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
    }
});

export default GetData;
