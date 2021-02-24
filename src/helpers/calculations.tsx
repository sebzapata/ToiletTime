import { DateTime, Duration } from 'luxon';
import { TimeAndRanking } from './interfaces';

export const calculateTotalNumber = (data: TimeAndRanking[]) => {
  const firstPoop = data.map(x => x.time)[0];

  return `I have done ${data.length} poos since ${firstPoop.monthLong} the ${firstPoop.day}${numberSuffix(firstPoop.day)} ${firstPoop.year}`
};

export const calculateAveragePerDay = (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  const lastDate = DateTime.max(...times);
  const firstDate = DateTime.min(...times);
  const numberOfDays = Math.ceil(lastDate.diff(firstDate, ["days"]).days);
  const averageNumber = (data.length/numberOfDays).toFixed(2);

  return `On average, I did ${averageNumber} poos a day`;
};

export const calculateLongestTimeBetweenPoos = (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  let maxDiff: Duration;

  for (let x = 1; x < times.length; x++) {
    if (!maxDiff) {
      maxDiff = times[x].diff(times[x - 1], ['days', 'hours', 'minutes']);
    }
    if (times[x].diff(times[x - 1]) > maxDiff) {
      maxDiff = times[x].diff(times[x - 1], ['days', 'hours', 'minutes']);
    }
  }

  return `The longest time without pooping was ${maxDiff.days} days, ${maxDiff.hours} hours and ${maxDiff.minutes} minutes`
};

const findBusiestDay = (times: DateTime[]) => {
  const mondayCount = [...new Set(times.filter(x => x.weekday === 1).map(y => y.toFormat('dd-LL-yyyy')))];
  const tuesdayCount = [...new Set(times.filter(x => x.weekday === 2).map(y => y.toFormat('dd-LL-yyyy')))];
  const wednesdayCount = [...new Set(times.filter(x => x.weekday === 3).map(y => y.toFormat('dd-LL-yyyy')))];
  const thursdayCount = [...new Set(times.filter(x => x.weekday === 4).map(y => y.toFormat('dd-LL-yyyy')))];
  const fridayCount = [...new Set(times.filter(x => x.weekday === 5).map(y => y.toFormat('dd-LL-yyyy')))];
  const saturdayCount = [...new Set(times.filter(x => x.weekday === 6).map(y => y.toFormat('dd-LL-yyyy')))];
  const sundayCount = [...new Set(times.filter(x => x.weekday === 7).map(y => y.toFormat('dd-LL-yyyy')))];

  const arrayOfDays = [mondayCount, tuesdayCount, wednesdayCount, thursdayCount, fridayCount, saturdayCount, sundayCount];
  arrayOfDays.sort((x, y) => x.length > y.length ? 1 : y.length > x.length ? - 1 : 0);

  return {
    weekdayLong: DateTime.fromFormat(arrayOfDays[arrayOfDays.length - 1][0], 'dd-LL-yyyy').weekdayLong,
    count: arrayOfDays[arrayOfDays.length - 1].length,
  };
};

export const calculateDayWithMostPoos = (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  const busiestDay = findBusiestDay(times);
  const durationOfTimings = data[data.length - 1].time.diff(data[0].time, "weeks");
  const percentage = (busiestDay.count/durationOfTimings.weeks*100).toFixed();

  return `The day that I most frequently pooped on was a ${busiestDay.weekdayLong}, 
  with ${percentage}% having a poo`

};

export const calculateMostPoosIn24Hours = (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  let firstPoo: DateTime;
  let lastPoo: DateTime;

  let mostPoopsInTimePeriod = 0;
  for (let x = 0; x < times.length; x++) {
    const currentPooPlusTimePeriod = times[x].plus({days: 1});
    const pooWhichIsAfterTimePeriodWindow = times.find(x => x > currentPooPlusTimePeriod);
    const lastPooInTimePeriodWindowIndex = times.indexOf(pooWhichIsAfterTimePeriodWindow) - 1;
    const numberOfPoosInTimePeriod = lastPooInTimePeriodWindowIndex + 1 - x;

    if (numberOfPoosInTimePeriod > mostPoopsInTimePeriod) {
      mostPoopsInTimePeriod = numberOfPoosInTimePeriod;
      firstPoo = times[x];
      lastPoo = times[lastPooInTimePeriodWindowIndex]
    }
  }

  return `The most poops I've done in 24 hours is ${mostPoopsInTimePeriod}, 
    from ${firstPoo.monthLong} ${firstPoo.day}${numberSuffix(firstPoo.day)} ${firstPoo.toFormat('hh:mm')} 
    to ${lastPoo.monthLong} ${lastPoo.day}${numberSuffix(lastPoo.day)} ${lastPoo.toFormat('hh:mm')} ${lastPoo.year}`
};

export const calculateMostPoosInTimePeriod = (data: TimeAndRanking[], timePeriod: number) => {
  const times = data.map(x => x.time);
  let firstPoo: DateTime;
  let lastPoo: DateTime;

  let mostPoopsInTimePeriod = 0;
  for (let x = 0; x < times.length; x++) {
    const currentPooPlusTimePeriod = times[x].plus({days: timePeriod}).startOf("day");
    const pooWhichIsAfterTimePeriodWindow = times.find(x => x > currentPooPlusTimePeriod);
    const lastPooInTimePeriodWindowIndex = times.indexOf(pooWhichIsAfterTimePeriodWindow) - 1;
    const numberOfPoosInTimePeriod = lastPooInTimePeriodWindowIndex + 1 - x;

    if (numberOfPoosInTimePeriod > mostPoopsInTimePeriod) {
      mostPoopsInTimePeriod = numberOfPoosInTimePeriod;
      firstPoo = times[x];
      lastPoo = times[lastPooInTimePeriodWindowIndex]
    }
  }

  return `The most poops I've done in ${timePeriod} days is ${mostPoopsInTimePeriod}, 
    from ${firstPoo.monthLong} ${firstPoo.day}${numberSuffix(firstPoo.day)} 
    to ${lastPoo.monthLong} ${lastPoo.day}${numberSuffix(lastPoo.day)} ${lastPoo.year}`
};

export const calculateMainDayForHardPoos = (data: TimeAndRanking[]) => {
  const filteredPoos = data.filter(x => x.ranking <= 2);
  const times = filteredPoos.map(x => x.time);

  const busiestDay = findBusiestDay(times);

  return `The day that I most frequently did a hard poop (2 or lower) on was a ${busiestDay.weekdayLong}`
};

export const calculateMainDayForSoftPoos = (data: TimeAndRanking[]) => {
  const filteredPoos = data.filter(x => x.ranking >= 5);
  const times = filteredPoos.map(x => x.time);

  const busiestDay = findBusiestDay(times);

  return `The day that I most frequently did a soft poop (5 or higher) on was a ${busiestDay.weekdayLong}`
};


export const calculateMainDayForMultiplePoos = (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  type daysInWeekIndex = "Monday"| "Tuesday"| "Wednesday"| "Thursday"| "Friday"| "Saturday"| "Sunday";

  let daysInWeek = {
    "Monday": 0,
    "Tuesday": 0,
    "Wednesday": 0,
    "Thursday": 0,
    "Friday": 0,
    "Saturday": 0,
    "Sunday": 0,
  };
  for (let x = 0; x < times.length; x++) {
    const currentPooEndOfDay = times[x].endOf("day");
    const pooWhichIsAfterEndOfDay = times.find(x => x > currentPooEndOfDay);
    const lastPooInDayIndex = times.indexOf(pooWhichIsAfterEndOfDay) - 1;

    if (lastPooInDayIndex - x > 0) {
      daysInWeek[times[x].weekdayLong as daysInWeekIndex] = daysInWeek[times[x].weekdayLong as daysInWeekIndex] + 1;
      x = lastPooInDayIndex;
    }
  }

  const daysInWeekArray = Object.keys(daysInWeek).map(x => ({day: x, number: daysInWeek[x as daysInWeekIndex]}));
  daysInWeekArray.sort((x, y) => x.number > y.number ? 1 : y.number > x.number ? -1 : 0 );

  const mostCommon = daysInWeekArray[daysInWeekArray.length - 1];
  const durationOfTimings = data[data.length - 1].time.diff(data[0].time, "weeks");
  const percentage = (mostCommon.number/durationOfTimings.weeks * 100).toFixed();
  return `The most common day to have multiple poops is a ${mostCommon.day}, with ${percentage}% having 2 or more`;
};

export const calculateMainDayForNoPoos= (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  type daysInWeekIndex = "Monday"| "Tuesday"| "Wednesday"| "Thursday"| "Friday"| "Saturday"| "Sunday";

  let daysInWeek = {
    "Monday": 0,
    "Tuesday": 0,
    "Wednesday": 0,
    "Thursday": 0,
    "Friday": 0,
    "Saturday": 0,
    "Sunday": 0,
  };

  for (let x = 0; x < times.length - 1; x++) {
    if (times[x + 1].weekdayLong !== times[x].weekdayLong) {  //If next poo not on the same day
      if (times[x + 1].weekdayLong !== times[x].plus({ day: 1}).weekdayLong) {  // if next poo is not the next day
        daysInWeek[times[x].plus({ day: 1}).weekdayLong as daysInWeekIndex] = daysInWeek[times[x].plus({ day: 1}).weekdayLong as daysInWeekIndex] + 1; //Need to loop til next poo

        if (times[x + 1].weekdayLong !== times[x].plus({ day: 2}).weekdayLong) {  // if next poo is not the next day after
          daysInWeek[times[x].plus({ day: 2}).weekdayLong as daysInWeekIndex] = daysInWeek[times[x].plus({ day: 2}).weekdayLong as daysInWeekIndex] + 1; //Need to loop til next poo
        }
      }
    }
  }

  const daysInWeekArray = Object.keys(daysInWeek).map(x => ({day: x, number: daysInWeek[x as daysInWeekIndex]}));
  daysInWeekArray.sort((x, y) => x.number > y.number ? 1 : y.number > x.number ? -1 : 0 );

  const mostCommon = daysInWeekArray[daysInWeekArray.length - 1];
  const durationOfTimings = data[data.length - 1].time.diff(data[0].time, "weeks");
  const percentage = (mostCommon.number/durationOfTimings.weeks * 100).toFixed();
  return `The most common day to have no poops is a ${mostCommon.day}, with ${percentage}% having none`;
};

export const calculateMostPooDaysInARow = (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  let currentTrack = { startDate: times[0], endDate: times[0] };
  let longestTrack = { startDate: times[0], endDate: times[0] };

  for (let x = 1; x <= times.length; x++) {
    if (x === times.length || (times[x].day !== times[x - 1].plus({day: 1}).day && times[x].day !== times[x - 1].day)) {
      if (currentTrack.endDate.diff(currentTrack.startDate, "days") > longestTrack.endDate.diff(longestTrack.startDate, "days")) {
        longestTrack = { startDate: currentTrack.startDate, endDate: currentTrack.endDate };
      }

      currentTrack = { startDate: times[x], endDate: times[x] };
    } else {
      currentTrack.endDate = times[x];
    }
  }

  const longestCount = Math.ceil(longestTrack.endDate.diff(longestTrack.startDate, "days").days);
  const startDate = `${longestTrack.startDate.toFormat('LLLL d')}${numberSuffix(longestTrack.startDate.day)}`;
  const endDate = `${longestTrack.endDate.toFormat('LLLL d')}${numberSuffix(longestTrack.endDate.day)} ${longestTrack.endDate.year}`;

  return `The most consecutive days with poos was ${longestCount} from ${startDate} to ${endDate}`
};

const numberSuffix = (number: number) => {
  switch (number % 10) {
    case 1: return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};
