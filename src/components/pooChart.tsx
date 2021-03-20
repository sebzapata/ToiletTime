import React from 'react';
import poo1 from '../images/Type 1.jpg'
import poo2 from '../images/Type 2.jpg'
import poo3 from '../images/Type 3.jpg'
import poo4 from '../images/Type 4.jpg'
import poo5 from '../images/Type 5.jpg'
import poo6 from '../images/Type 6.jpg'
import poo7 from '../images/Type 7.jpg'

import './pooChart.module.scss'

const PooChart = () => {
  const renderPoo = (image: string , header: string, text: string) => {
    return (
      <div className="imageWrapper">
        <img src={image} className="pooChartWrapper__image"/>
        <div className="imageWrapper__text">
          <h4>{header}</h4>
          <p>{text}</p>
        </div>
      </div>
    )
  };

  return (
    <div className="pooChartWrapper">
      {renderPoo(poo1, "Type 1 - Severe constipation", "Separate, hard lumps")}
      {renderPoo(poo2, "Type 2 - Mild constipation", "Lumpy and sausage like")}
      {renderPoo(poo3, "Type 3 - Normal", "A sausage shape with cracks in the surface")}
      {renderPoo(poo4, "Type 4 - Normal", "Like a smooth, soft sausage or snake")}
      {renderPoo(poo5, "Type 5 - Lacking fibre", "Soft blobs with clear-cut edges")}
      {renderPoo(poo6, "Type 6 - Mild diarrhoea", "Mushy consistency with ragged edges")}
      {renderPoo(poo7, "Type 7 - Sever diarrhoea", "Liquid consistency with no solid pieces")}
    </div>
  )
};

export default PooChart;
