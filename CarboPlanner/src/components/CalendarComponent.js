import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
    const [value, setValue] = useState(getCurrentDate());

    const onSelectDate = (value) => {
        setValue(value);
    };

    //Uses slice(-2) to ensure that the month and day are represented as two digits ('01' instead of '1')
    const formattedDate = value.getFullYear() + '-' +
        ('0' + (value.getMonth() + 1)).slice(-2) + '-' +
        ('0' + value.getDate()).slice(-2);

    //Retrieve meal data for the selected date or set a default message if no data available
    const agenda = mealData[formattedDate] || 'No meals for this date.';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                fontFamily: 'Inter',
                borderRadius: '20px',
                backgroundColor: '#f5f5f5',
                padding: '20px',
            }}>
                <Calendar
                    onChange={onSelectDate}
                    value={value}
                    locale="en-GB"
                    style={{
                        border: 'none',
                        backgroundColor: '#ffffff',
                    }}
                />
                <style>{`
                    .react-calendar {
                        font-family: 'Inter';
                        color: #333;
                    }
                 
                    .react-calendar__tile--active {
                        background-color: #4caf50 !important; /* Green */
                        color: white !important;
                        border-radius: 45%;
                    }
    
                    .react-calendar__tile--now {
                        background-color: #8bc34a !important; /* Light Green */
                        color: white !important;
                        border-radius: 45%;
                    }
                    .react-calendar__month-view__days__day--weekend {
                        color: #333 !important; /* Match the color of other days */
                    }
                    
                    .react-calendar__navigation__label {
                        font-size: 20px;
                        font-weight: bold;
                        color: #333;
                    }
                    
                    .react-calendar__navigation__arrow {
                        font-size: 24px;
                        color: #4caf50;
                        cursor: pointer;
                    }
                `}</style>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'Inter'}}>
                <h3>Agenda for {formattedDate}</h3>
                <p>{agenda}</p>
            </div>
        </div>
    );
}
