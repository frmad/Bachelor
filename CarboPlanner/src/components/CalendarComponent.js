import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {
    const [value, onChange] = useState(new Date());

    return (
        <div style={{ fontFamily: 'Inter', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f5f5f5', padding: '20px' }}>
            <Calendar
                onChange={onChange}
                value={value}
                locale="en-GB"
                style={{ border: 'none', backgroundColor: '#ffffff' }}
            />
            <style>{`
                .react-calendar {
                    font-family: 'Inter';
                    color: #333;
                }

                .react-calendar__tile--active {
                    background-color: #4caf50 !important; /* Green */
                    color: white !important;
                }

                .react-calendar__tile--now {
                    background-color: #8bc34a !important; /* Light Green */
                    color: white !important;
                }
            `}</style>
        </div>
    );
}
