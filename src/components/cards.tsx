import Axios from 'axios';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/card';

import './cards.module.scss';
import {
  calculateAveragePerDay,
  calculateDayWithMostPoos,
  calculateLongestTimeBetweenPoos,
  calculateMainDayForHardPoos,
  calculateMainDayForMultiplePoos,
  calculateMainDayForNoPoos,
  calculateMainDayForSoftPoos,
  calculateMostPooDaysInARow,
  calculateMostPoosInTimePeriod,
  calculateTotalNumber
} from '../helpers/calculations';
import { TimeAndRanking, TimeAndRankingRaw } from '../helpers/interfaces';

const Cards: React.FunctionComponent = () => {
  const [timings, setTimings] = useState<TimeAndRanking[]>([]);

  useEffect(() => {
    const getTimings = async (): Promise<void> => {
      const url = 'https://toilet-a075.restdb.io/rest/timings'
      const timings = await Axios.get(url, {
        headers: {
          "x-api-key": "601f19033f9eb665a1689200"
        }
      });

      const data: TimeAndRankingRaw[] = timings.data;
      const formattedData = data.map(x => ({
        time: DateTime.fromFormat(x.DateTime, 'yyyy/LL/dd hh:mm'),
        ranking: x.Ranking
      }));

      setTimings(formattedData)
    };

    getTimings().then();
  }, []);


  const renderCard = (title: string, text?: string) => {
    return (
      <Card className='cardsWrapper__card'>
        <Card.Body>
          <Card.Title className='cardsWrapper__card__title'>{title}</Card.Title>
          <Card.Text className='cardsWrapper__card__text'>{text}</Card.Text>
        </Card.Body>
      </Card>
    )
  };

  const renderCardsSection = () => {
    if (!timings.length) return null;

    return (
      <>
        <h2 className="cardsSection__header">Fun facts about the past year's pooping</h2>
        <div className="cardsWrapper">
          {renderCard("How many?", calculateTotalNumber(timings))}
          {renderCard("Average per day?", calculateAveragePerDay(timings))}
          {renderCard("Longest dry spell?", calculateLongestTimeBetweenPoos(timings))}
          {renderCard("Best day for pooping?", calculateDayWithMostPoos(timings))}
          {renderCard("Most in 24 hours?", calculateMostPoosInTimePeriod(timings, 1))}
          {renderCard("Most in 7 days?", calculateMostPoosInTimePeriod(timings, 7))}
          {renderCard("Main day for hard poos?", calculateMainDayForHardPoos(timings))}
          {renderCard("Main day for soft poos?", calculateMainDayForSoftPoos(timings))}
          {renderCard("Main day for multiple poos?", calculateMainDayForMultiplePoos(timings))}
          {renderCard("Main day for no poos?", calculateMainDayForNoPoos(timings))}
          {renderCard("Most consecutive poos?", calculateMostPooDaysInARow(timings))}
        </div>
      </>
    )
  };

  return (
    renderCardsSection()
    )
};

export default Cards;
