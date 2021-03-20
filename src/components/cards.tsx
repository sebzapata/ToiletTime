import React, { useEffect } from 'react';
import Card from 'react-bootstrap/card';

import { useDispatch, useSelector } from 'react-redux';

import './cards.module.scss';
import {
  calculateAveragePerDay,
  calculateDayWithMostPoos,
  calculateLongestTimeBetweenPoos,
  calculateMainDayForHardPoos,
  calculateMainDayForMultiplePoos,
  calculateMainDayForNoPoos,
  calculateMainDayForSoftPoos,
  calculateMostPooDaysInARow, calculateMostPoosIn24Hours,
  calculateMostPoosInTimePeriod,
  calculateTotalNumber
} from '../helpers/calculations';
import getTimings from '../store/actions/timingsAction';
import { RootState } from '../store/reducers';

import './cards.module.scss';
import { Accordion } from './accordion';
import { AccordionItem } from './accordionItem';
import PooChart from './pooChart';

const Cards: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const timings = useSelector((state: RootState) => state.timingsList);

  useEffect(() => {
    dispatch(getTimings())
  }, [dispatch]);


  if (timings.loading) return <h2 className="loading">Retrieving poo data</h2>;

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
    const data = timings.timings;

    if (!data.length) return null;

    return (
      <>
        <h2 className="cardsSection__header">Fun facts about the past year's pooping</h2>
        <Accordion>
          <AccordionItem title="Bristol Stool chart">
            <PooChart />
          </AccordionItem>
        </Accordion>
        <div className="cardsWrapper">
          {renderCard("How many?", calculateTotalNumber(data))}
          {renderCard("Average per day?", calculateAveragePerDay(data))}
          {renderCard("Longest dry spell?", calculateLongestTimeBetweenPoos(data))}
          {renderCard("Most consecutive poos?", calculateMostPooDaysInARow(data))}
          {renderCard("Best day for pooping?", calculateDayWithMostPoos(data))}
          {renderCard("Main day for multiple poos?", calculateMainDayForMultiplePoos(data))}
          {renderCard("Main day for no poos?", calculateMainDayForNoPoos(data))}
          {renderCard("Most in 24 hours?", calculateMostPoosIn24Hours(data))}
          {renderCard("Most in 7 days?", calculateMostPoosInTimePeriod(data, 7))}
          {renderCard("Main day for hard poos?", calculateMainDayForHardPoos(data))}
          {renderCard("Main day for soft poos?", calculateMainDayForSoftPoos(data))}
        </div>
      </>
    )
  };

  return (
    renderCardsSection()
    )
};

export default Cards;
