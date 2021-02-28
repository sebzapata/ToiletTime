import * as React from "react";

import './accordion.module.scss'

export const Accordion: React.FunctionComponent = ({ children }) => {
  return (
    <div className="accordion">
      {children}
    </div>
  );
};
