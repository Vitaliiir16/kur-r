import React from 'react';
import './PathInfo.css';

function PathInfo({ pathResult }) {
  return (
    <div className="path-info">
      <h3>Найкоротший шлях:</h3>
      <div>Шлях: {pathResult.path.join(" -> ")}</div>
      <div>Довжина шляху: {pathResult.totalWeight}</div>
    </div>
  );
}

export default PathInfo;
