import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//https://www.npmjs.com/package/react-native-calendars#calendar
export default function CalendarComponent() {
    const [value, onChange] = useState(new Date());

    return (
        <div style={{
            fontFamily: 'Inter',
            borderRadius: '20px',
            backgroundColor: '#f5f5f5',
            padding: '20px',
        }}>
            <Calendar
                onChange={onChange}
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
    );
}
