import React from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendars.module.scss';


const Calendars: React.FunctionComponent = () => {

  return (
    <div>
      <Calendar
        activeStartDate={new Date(2020, 1, 1)}
        showNavigation={false}
        showNeighboringMonth={false}
        tileClassName={({ activeStartDate, date }) => date.getDay() > 3 ? 'wednesday' : null}
      />
    </div>
  )
};

export default Calendars;
