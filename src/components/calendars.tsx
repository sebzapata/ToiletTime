import { DateTime } from 'luxon';
import React from 'react';
import Calendar from 'react-calendar';

// import 'react-calendar/dist/Calendar.css';
import './calendarsDefault.module.scss';
import './calendars.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';


const Calendars: React.FunctionComponent = () => {
  const timingData = useSelector((state:RootState) => state.timingsList);

  if (timingData.loading) return null;

  const firstPoo = timingData.timings[0].time;
  const lastPoo = timingData.timings[timingData.timings.length - 1].time;
  const duration = Math.ceil(lastPoo.diff(firstPoo, "months").months);

  const calendars: JSX.Element[] = [];

  for (let j = firstPoo.month-1; j <= duration + 1; j++) {
    const month = firstPoo.plus({ month: j-1});
    calendars.push(
      <div className="calendarWithMonth" key={`calendar-${month.year}-${month.month}`}>
        <h3 className="monthHeader">{`${month.monthLong} ${month.year}`}</h3>
        <Calendar
          activeStartDate={new Date(firstPoo.year, j, 1)}
          showNavigation={false}
          showNeighboringMonth={false}
          tileClassName={({ activeStartDate, date }) => {
            const poosForThatDay = timingData.timings.filter(x => (
              x.time.day === DateTime.fromJSDate(date).day &&
              x.time.month == DateTime.fromJSDate(date).month &&
              x.time.year === DateTime.fromJSDate(date).year
            ));

            switch (poosForThatDay.length) {
              case 1: return "onePoo";
              case 2: return "twoPoo";
              case 3: return "threePoo";
              case 4: return "fourPoo";

              default: return "noPoo";
            }

          }}
        />
      </div>
    )
  }

  const renderColourKey = () => (
    <div className="calendarColourKey">
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#ffca00" />
        </svg>
        <p>: 1 poo</p>
      </div>
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#fa8a00" />
        </svg>
        <p>: 2 poos</p>
      </div>
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#f04c00" />
        </svg>
        <p>: 3 poos</p>
      </div>
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#FF0000" />
        </svg>
        <p>: 4 poos</p>
      </div>
    </div>
  );

  return (
    <div>
      {renderColourKey()}
      <div className="calendarsWrapper">
        {calendars}
      </div>
    </div>
  )
};

export default Calendars;
