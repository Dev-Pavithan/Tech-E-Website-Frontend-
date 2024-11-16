import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css'; 
import { useOutletContext } from 'react-router-dom';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const { isDarkMode } = useOutletContext();

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (date.getDay() === 0 || date.getDay() === 6) {
                return 'highlight-weekend';
            }
        }
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={date}
                tileClassName={tileClassName}
            />
            <p> {date.toDateString()}</p>
        </div>
    );
};

export default CalendarComponent;
