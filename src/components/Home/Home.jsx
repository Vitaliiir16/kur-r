import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <h1>Курсова робота</h1>
      <div className="controls">
        <Link to="/graph"><button className="btn">Граф + Дейкстра</button></Link>
        <Link to="/list"><button className="btn">Двозв'язний список</button></Link>
      </div>
    </div>
  );
}

export default Home;
