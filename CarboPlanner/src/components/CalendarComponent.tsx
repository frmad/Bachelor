import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native';
import GetData from "./getData"


const getCurrentDate = () => {
    const now = new Date();
    return (`${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`);
};

export default function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [markedDates, setMarkedDates] = useState({});

    const onSelectDate = (date) => {
        setSelectedDate(`${date.day.toString().padStart(2, '0')}-${(date.month).toString().padStart(2, '0')}-${date.year}`);
        /* retrieves the meal data from mealData using the selected date
        then sets the agenda to this retrieved meal data
         */
        setMarkedDates(date.dateString);
        
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={(day) => {onSelectDate(day)}}
                    markedDates={{ [markedDates]: { selected: true, selectedColor: '#65CB2E' }}}
                    theme={{
                        arrowColor: '#65CB2E',
                        todayTextColor: '#65CB2E',
                    }}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: "#45505B" }}>
                    <Text style={{ fontWeight: 'bold' }}>Agenda for {selectedDate}: </Text>
                </Text>
            </View>

            {/* Meal stats */}
            {/* Shown if there is any meal data */}
                <ScrollView style={{
                    paddingVertical: 10,
                    marginVertical:10,
                    height: 100 }}>
                    <View style={styles.container}>
                        {<GetData selectedDate={selectedDate} />}
                    </View>
                </ScrollView>
            
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
