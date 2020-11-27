import React from 'react';

import './header.module.scss';
import Input from './input';

const Header:React.FunctionComponent = () => (
  <>
    <h1 className="header__title">&lt;TOILET TRACKER&gt;</h1>
    <Input />
  </>
);

export default Header;