import { DateTime, Duration } from 'luxon';
import { TimeAndRanking } from './interfaces';

export const calculateTotalNumber = (data: TimeAndRanking[]) => {
  const firstPoop = data.map(x => x.time)[0];


  return `I have done ${data.length} poos since ${firstPoop.monthLong} the ${firstPoop.day}${numberSuffix(firstPoop.day)}`
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
  const mondayCount = times.filter(x => x.weekday === 1);
  const tuesdayCount = times.filter(x => x.weekday === 2);
  const wednesdayCount = times.filter(x => x.weekday === 3);
  const thursdayCount = times.filter(x => x.weekday === 4);
  const fridayCount = times.filter(x => x.weekday === 5);
  const saturdayCount = times.filter(x => x.weekday === 6);
  const sundayCount = times.filter(x => x.weekday === 7);

  const arrayOfDays = [mondayCount, tuesdayCount, wednesdayCount, thursdayCount, fridayCount, saturdayCount, sundayCount];
  arrayOfDays.sort((x, y) => x.length > y.length ? 1 : y.length > x.length ? - 1 : 0);

  return arrayOfDays[arrayOfDays.length - 1][0].weekdayLong;
};

export const calculateDayWithMostPoos = (data: TimeAndRanking[]) => {
  const times = data.map(x => x.time);
  const busiestDay = findBusiestDay(times);

  return `The day that I most frequently pooped on was ${busiestDay}`
};

export const calculateMostPoosInTimePeriod = (data: TimeAndRanking[], timePeriod: number) => {
  const times = data.map(x => x.time);

  let mostPoopsInTimePeriod = 0;
  for (let x = 0; x < times.length; x++) {
    const currentPooPlus24Hours = times[x].plus({days: timePeriod});
    const pooWhichIsAfter24HourWindow = times.find(x => x > currentPooPlus24Hours);
    const lastPooIn24HourWindowIndex = times.indexOf(pooWhichIsAfter24HourWindow) - 1;

    if (lastPooIn24HourWindowIndex - x > mostPoopsInTimePeriod) {
      mostPoopsInTimePeriod = lastPooIn24HourWindowIndex - x;
    }
  }

  return timePeriod > 1 ? `The most poops I've done in ${timePeriod} days is ${mostPoopsInTimePeriod}` : `The most poops I've done in 24 hours is ${mostPoopsInTimePeriod}`
};

export const calculateMainDayForHardPoos = (data: TimeAndRanking[]) => {
  const filteredPoos = data.filter(x => x.ranking <= 2);
  const times = filteredPoos.map(x => x.time);

  const busiestDay = findBusiestDay(times);

  return `The day that I most frequently did a hard poop (2 or lower) on was ${busiestDay}`
};

export const calculateMainDayForSoftPoos = (data: TimeAndRanking[]) => {
  const filteredPoos = data.filter(x => x.ranking >= 5);
  const times = filteredPoos.map(x => x.time);

  const busiestDay = findBusiestDay(times);

  return `The day that I most frequently did a soft poop (5 or higher) on was ${busiestDay}`
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
  const startDate = `${longestTrack.startDate.toFormat('LLLL d')}${numberSuffix(longestTrack.startDate.day)}`
  const endDate = `${longestTrack.endDate.toFormat('LLLL d')}${numberSuffix(longestTrack.endDate.day)}`

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
