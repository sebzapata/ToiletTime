import React from 'react';
import './App.scss';
import Calendars from '../components/calendars';
import Header from '../components/header';
import Cards from '../components/cards';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  componentDidMount(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  render() {
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    return (
      <div className="page">
        <Header />
        <Calendars />
        <Cards />
      </div>
    );
  }
}

export default App;
