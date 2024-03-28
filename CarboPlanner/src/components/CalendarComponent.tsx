import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return new Date(`${year}-${month}-${day}`);
};

const mealData = {
    [getCurrentDate().toISOString().split('T')[0]]: 'Oatmeal, Lunch: Sandwich, Dinner: Pasta',
    // Add more meal data as needed
};

export default function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    const onSelectDate = (date) => {
        setSelectedDate(date);
    };

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const agenda = mealData[formattedDate] || 'No meals for this date.';

    return (
        <View style={{ flex: 1 }}>
            <Calendar
                onDayPress={(day) => onSelectDate(new Date(day.timestamp))}
                markedDates={{ [formattedDate]: { selected: true, selectedColor: '#65CB2E' } }}
            />
            <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Inter', color: "#45505B" }}>
                    <Text style={{ fontWeight: 'bold' }}>Agenda for {formattedDate}: </Text>
                    {agenda}
                </Text>
            </View>
        </View>
    );
}
