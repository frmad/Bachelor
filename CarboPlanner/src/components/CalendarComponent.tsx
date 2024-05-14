import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native';
import GetData from "./GetData"

const getCurrentDate = () => {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
};

export default function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [markedDates, setMarkedDates] = useState({});

    const onSelectDate = (date) => {
        setSelectedDate(`${date.day.toString().padStart(2, '0')}-${(date.month).toString().padStart(2, '0')}-${date.year}`);
        setMarkedDates(date.dateString);
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={onSelectDate}
                    markedDates={{ [markedDates]: { selected: true, selectedColor: '#65CB2E' }}}
                    theme={{
                        arrowColor: '#65CB2E',
                        todayTextColor: '#65CB2E',
                    }}
                />
                <View style={styles.agendaHeader}>
                    <Text style={styles.agendaHeaderText}>
                        {selectedDate}
                    </Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <GetData selectedDate={selectedDate} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    calendarContainer: {
        flex: 1,
        margin: 15,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    agendaHeader: {
        marginTop: 20,
        alignItems: 'center',
    },
    agendaHeaderText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#45505B",
        marginBottom: 7,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});
