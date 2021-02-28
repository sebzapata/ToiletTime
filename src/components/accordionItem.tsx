import React, { useState } from "react";
import plusIcon from "../images/iconmonstr-plus-1.svg";
import minusIcon from "../images/iconmonstr-minus-1.svg";

import './accordionItem.module.scss';

interface Props {
  title: string;
}

export const AccordionItem: React.FunctionComponent<Props> = ({ title, children }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className={`accordion__section`}>
      <div className="accordion__section__header" onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
        <button className="accordion__section__header__title">{title}</button>
        <img className="accordion__section__header__icon" src={isAccordionOpen ? minusIcon : plusIcon} alt={isAccordionOpen ? "Close accordion" : "Open accordion"}/>
      </div>
      {isAccordionOpen && <div className="accordion__section__panel">
        {children}
      </div>}
    </div>
  )
};
