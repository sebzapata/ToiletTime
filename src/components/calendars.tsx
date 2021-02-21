import { DateTime } from 'luxon';
import React from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendars.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';


const Calendars: React.FunctionComponent = () => {
  const timingData = useSelector((state:RootState) => state.timingsList);
  const february = timingData.timings.filter(x => x.time.month === 2 && x.time.year === 2020);
  console.log(february)

  return (
    <div>
      <Calendar
        activeStartDate={new Date(2020, 1, 1)}
        showNavigation={false}
        showNeighboringMonth={false}
        tileClassName={({ activeStartDate, date }) => {
          const day = february.find(x => x.time.day === DateTime.fromJSDate(date).day);

          return day ? "wednesday" : ""
        }}
      />
    </div>
  )
};

export default Calendars;
