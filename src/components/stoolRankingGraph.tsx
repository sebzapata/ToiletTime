import chartjs from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RootState } from '../store/reducers';

import './stoolRankingGraph.module.scss';

const StoolRankingGraph: React.FunctionComponent = () => {
  const rankings = useSelector((state: RootState) => state.timingsList).timings.map(x => x.ranking);

  const rank1 = rankings.filter(x => x === 1);
  const rank2 = rankings.filter(x => x === 2);
  const rank3 = rankings.filter(x => x === 3);
  const rank4 = rankings.filter(x => x === 4);
  const rank5 = rankings.filter(x => x === 5);
  const rank6 = rankings.filter(x => x === 6);
  const rank7 = rankings.filter(x => x === 7);

  const data: chartjs.ChartData = {
    labels: ["Type 1", "Type 2", "Type 3", "Type 4", "Type 5", "Type 6", "Type 7"],
    datasets: [
      {
        data: [rank1.length, rank2.length, rank3.length, rank4.length, rank5.length, rank6.length, rank7.length],
        backgroundColor: ['rgb(173, 106, 0)', 'rgb(156, 90, 6)', 'rgb(138, 75, 9)', 'rgb(120, 60, 11)', 'rgb(102, 47, 10)', 'rgb(83, 34, 7)', 'rgb(65, 23, 0)']
      },
    ]
  };

  const options: chartjs.ChartOptions = {

    tooltips: {
      displayColors: false,
    },
    title: {
      text: "A graph to show the frequency of different types of poos",
      display: true
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
      },
    },
  };

  chartjs.plugins.unregister(ChartDataLabels)

  const renderLegend = () => {
    return (
      <ul className="listWrapper">
        <li className="type1"><div /><b>Type 1:&nbsp;</b>{`${(rank1.length/rankings.length*100).toFixed(2)}%`}</li>
        <li className="type2"><div /><b>Type 2:&nbsp;</b>{`${(rank2.length/rankings.length*100).toFixed(2)}%`}</li>
        <li className="type3"><div /><b>Type 3:&nbsp;</b>{`${(rank3.length/rankings.length*100).toFixed(2)}%`}</li>
        <li className="type4"><div /><b>Type 4:&nbsp;</b>{`${(rank4.length/rankings.length*100).toFixed(2)}%`}</li>
        <li className="type5"><div /><b>Type 5:&nbsp;</b>{`${(rank5.length/rankings.length*100).toFixed(2)}%`}</li>
        <li className="type6"><div /><b>Type 6:&nbsp;</b>{`${(rank6.length/rankings.length*100).toFixed(2)}%`}</li>
        <li className="type7"><div /><b>Type 7:&nbsp;</b>{`${(rank7.length/rankings.length*100).toFixed(2)}%`}</li>
      </ul>
    )
  };

  return (
    <div>
      <Pie data={data} options={options} />
      {renderLegend()}
    </div>
  )
};

export default StoolRankingGraph;
