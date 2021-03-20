import chartjs from 'chart.js';
import React from 'react';
import  { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import { RootState } from '../store/reducers';

const DaysOfWeekGraph: React.FunctionComponent = () => {
  const timings = useSelector((state: RootState) => state.timingsList).timings.map(x => x.time);
  const mondayCount = timings.filter(x => x.weekday === 1);
  const tuesdayCount = timings.filter(x => x.weekday === 2);
  const wednesdayCount = timings.filter(x => x.weekday === 3);
  const thursdayCount = timings.filter(x => x.weekday === 4);
  const fridayCount = timings.filter(x => x.weekday === 5);
  const saturdayCount = timings.filter(x => x.weekday === 6);
  const sundayCount = timings.filter(x => x.weekday === 7);

  const data: chartjs.ChartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        data: [mondayCount.length, tuesdayCount.length, wednesdayCount.length, thursdayCount.length, fridayCount.length, saturdayCount.length, sundayCount.length],
        backgroundColor: 'rgba(128, 0, 255, 0.8)',
      },
    ]
  };

  const options: chartjs.ChartOptions = {
    tooltips: {
      enabled: false,
    },
    title: {
      text: "A graph to show days of the week against number of poos",
      display: true
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            labelString: "Day of week",
            display: true,
            fontStyle: "bold"
          }
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            labelString: "Total number of poos",
            display: true,
            fontStyle: "bold"
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'start',
        offset: -20,
        font: {
          weight: 'bold',
          size: 10,
        },
      }
    }
  };

  return <Bar data={data} options={options} />
};

export default DaysOfWeekGraph;
