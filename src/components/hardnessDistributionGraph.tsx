import chartjs from 'chart.js';
import { DateTime } from 'luxon';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const HardnessDistributionGraph: React.FunctionComponent = () => {
  const pooData = useSelector((state: RootState) => state.timingsList.timings);

  const getSoftnessDistribution = (dayOfWeek: number) => {

    return ({
      hardCount: pooData.filter(x => x.time.weekday === dayOfWeek).filter(y => y.ranking <= 2).length,
      normalCount: pooData.filter(x => x.time.weekday === dayOfWeek).filter(y => y.ranking === 3 ||  y.ranking === 4).length,
      softCount: pooData.filter(x => x.time.weekday === dayOfWeek).filter(y => y.ranking >=5).length,
    })
  };

  const mondays = getSoftnessDistribution(1);
  const tuesdays = getSoftnessDistribution(2);
  const wednesdays = getSoftnessDistribution(3);
  const thursdays = getSoftnessDistribution(4);
  const fridays = getSoftnessDistribution(5);
  const saturdays = getSoftnessDistribution(6);
  const sundays = getSoftnessDistribution(7);

  const formatter = (value: number, ctx: any) => {
    const total = ctx.chart.data.datasets[0].data[ctx.dataIndex] + ctx.chart.data.datasets[1].data[ctx.dataIndex] + ctx.chart.data.datasets[2].data[ctx.dataIndex];

    return `${(value / total * 100).toFixed(0)}%`;
  };

  const data: chartjs.ChartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Hard poos",
        data: [mondays.hardCount, tuesdays.hardCount, wednesdays.hardCount, thursdays.hardCount, fridays.hardCount, saturdays.hardCount, sundays.hardCount],
        backgroundColor: "#2b75f2",
        datalabels: {
          formatter: formatter,
        }
      },
      {
        label: "Normal poos",
        data: [mondays.normalCount, tuesdays.normalCount, wednesdays.normalCount, thursdays.normalCount, fridays.normalCount, saturdays.normalCount, sundays.normalCount],
        backgroundColor: "#caf270",
        datalabels: {
          formatter: formatter,
        }
      },
      {
        label: "Soft poos",
        data: [mondays.softCount, tuesdays.softCount, wednesdays.softCount, thursdays.softCount, fridays.softCount, saturdays.softCount, sundays.softCount],
        backgroundColor: "#f27020",
        datalabels: {
          formatter: formatter,
        }
      },
    ]
  };

  const options: chartjs.ChartOptions = {
    tooltips: {
      // enabled: false,
    },
    title: {
      text: "A graph to show days of the week poo softness distribution",
      display: true
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            labelString: "Day of week",
            display: true,
            fontStyle: "bold"
          },
          stacked: true
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            labelString: "Distribution of poo softness",
            display: true,
            fontStyle: "bold"
          },
          stacked: true,
        },
      ],
    },
    plugins: {
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
          size: 10,
        },
        backgroundColor: '#dcdcdc22',
      }
    }
  };

  return <Bar data={data} options={options} />
};

export default HardnessDistributionGraph;
