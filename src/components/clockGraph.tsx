import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import chartjs from 'chart.js';

const ClockGraph: React.FunctionComponent = () => {
  const timings = useSelector((state: RootState) => state.timingsList.timings.map(x => x.time));

  const clockData = [
    timings.filter(x => x.hour === 0).length,
    timings.filter(x => x.hour === 1).length,
    timings.filter(x => x.hour === 2).length,
    timings.filter(x => x.hour === 3).length,
    timings.filter(x => x.hour === 4).length,
    timings.filter(x => x.hour === 5).length,
    timings.filter(x => x.hour === 6).length,
    timings.filter(x => x.hour === 7).length,
    timings.filter(x => x.hour === 8).length,
    timings.filter(x => x.hour === 9).length,
    timings.filter(x => x.hour === 10).length,
    timings.filter(x => x.hour === 11).length,
    timings.filter(x => x.hour === 12).length,
    timings.filter(x => x.hour === 13).length,
    timings.filter(x => x.hour === 14).length,
    timings.filter(x => x.hour === 15).length,
    timings.filter(x => x.hour === 16).length,
    timings.filter(x => x.hour === 17).length,
    timings.filter(x => x.hour === 18).length,
    timings.filter(x => x.hour === 19).length,
    timings.filter(x => x.hour === 20).length,
    timings.filter(x => x.hour === 21).length,
    timings.filter(x => x.hour === 22).length,
    timings.filter(x => x.hour === 23).length,
  ];

  const data: chartjs.ChartData  = {
    labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    datasets: [{
      data: clockData
    }
    ]
  };

  const options: chartjs.ChartOptions = {
    tooltips: {
      enabled: false
    },
    title: {
      text: "A graph to show hours of the day against number of poos",
      display: true
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            labelString: "Hour of day",
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
    },
  };

  return <Bar data={data} options={options} />
};

export default ClockGraph;