import React from 'react';
import './EdgeList.css';

function EdgeList({ edges }) {
  return (
    <div className="edge-list-container">
      <table className="edge-list-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Від</th>
            <th>До</th>
            <th>Вага</th>
          </tr>
        </thead>
        <tbody>
          {edges.map((edge, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{edge.from}</td>
              <td>{edge.to}</td>
              <td>{edge.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EdgeList;
