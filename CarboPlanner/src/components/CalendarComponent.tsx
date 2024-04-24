import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CircularSlider from "./CircularSlider";
import MacroProgressBar from "./MacroProgressBar";
import Card from "./Card";
import { ScrollView } from 'react-native';
import List from "./List";
import HorizontalLine from "./HorizontalLine";
import ListItem from "./ListItem";
import GetData from "./getData";

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return new Date(`${year}-${month}-${day}`);
};

// Sample meal data
const mealData = {
    '2024-04-12': {
        calories: 1000,
        carbs: 200,
        protein: 100,
        fat: 50,
    },
    '2024-04-10': {
        calories: 1000,
        carbs: 200,
        protein: 100,
        fat: 50,
    },
    '2024-04-08': {
        calories: 1000,
        carbs: 200,
        protein: 100,
        fat: 50,
    },
};

// Sample food item data
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

export default function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    /* sets the initial state of agenda to the meal data for the current selected date.
     If the selected date changes, the state will be updated.
     */
    const [agenda, setAgenda] = useState(mealData[selectedDate.toISOString().split('T')[0]]);
    const [selectedDateFormatted, setdate] = useState();
    const onSelectDate = (date) => {
        setSelectedDate(date);
        /* retrieves the meal data from mealData using the selected date
        then sets the agenda to this retrieved meal data
         */
        setAgenda(mealData[date.toISOString().split('T')[0]]);
        console.log(selectedDate)
        setdate(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`)
    console.log(selectedDateFormatted)
    };

    const formattedDate = selectedDate.toISOString().split('T')[0]; // Used for text

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={(day) => onSelectDate(new Date(day.timestamp))}
                    markedDates={{ [formattedDate]: { selected: true, selectedColor: '#65CB2E' } }}
                    theme={{
                        arrowColor: '#65CB2E',
                        todayTextColor: '#65CB2E',
                    }}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: "#45505B" }}>
                    <Text style={{ fontWeight: 'bold' }}>Agenda for {formattedDate}: </Text>
                    {agenda ? (
                        `Carbs: ${agenda.carbs}, Protein: ${agenda.protein}, Fat: ${agenda.fat}`
                    ) : (
                        'No meals for this date.'
                    )}
                </Text>
            </View>

            {/* Meal stats */}
            {/* Shown if there is any meal data */}
            {agenda && (
                <ScrollView style={{
                    paddingVertical: 10,
                    marginVertical:10,
                    height: 100 }}>
                    <View style={styles.container}>
                        <GetData selectedDate={selectedDateFormatted} />
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        height: '100%',
    },
    calendarContainer: {
        margin: 10,
        borderRadius: 20,
        overflow: 'hidden',
    }
});
