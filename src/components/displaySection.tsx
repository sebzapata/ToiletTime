import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


import 'swiper/swiper.scss';
import './displaySection.module.scss'
import Calendars from './calendars';
import Cards from './cards';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

const DisplaySection: React.FunctionComponent = () => {
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  const tabTitles = ["Calendars", "Fun facts"]

  return (
    <>
      <div className="swiper-pagination" />
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className}">${tabTitles[index]}</span>`;
          },
        }}
        width={null}
        simulateTouch={false}
      >
        <SwiperSlide><Calendars /></SwiperSlide>
        <SwiperSlide><Cards /></SwiperSlide>
      </Swiper>
    </>
  );
};

export default DisplaySection;
