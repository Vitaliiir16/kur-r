import React, { useState } from 'react';
import './Controls.css';

function Controls({
  addEdge,
  deleteEdge,
  startVertex,
  setStartVertex,
  endVertex,
  setEndVertex,
  handleStart,
  handleStop,
  handleBack
}) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [weight, setWeight] = useState('');
  const [delFrom, setDelFrom] = useState('');
  const [delTo, setDelTo] = useState('');

  const handleAddEdge = () => {
    const f = parseInt(from);
    const t = parseInt(to);
    const w = parseFloat(weight);
    if(!isNaN(f)&&!isNaN(t)&&!isNaN(w)) {
      addEdge(f,t,w);
      setFrom('');
      setTo('');
      setWeight('');
    }
  };

  const handleDeleteEdgeClick = () => {
    const f = parseInt(delFrom);
    const t = parseInt(delTo);
    if(!isNaN(f)&&!isNaN(t)) {
      deleteEdge(f,t);
      setDelFrom('');
      setDelTo('');
    }
  };

  return (
    <div className="controls">
      <input
        type="number"
        placeholder="Від"
        value={from}
        onChange={e=>setFrom(e.target.value)}
      />
      <input
        type="number"
        placeholder="До"
        value={to}
        onChange={e=>setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Вага"
        value={weight}
        onChange={e=>setWeight(e.target.value)}
      />
      <button onClick={handleAddEdge}>Додати ребро</button>

      <input
        type="number"
        placeholder="Видалити від"
        value={delFrom}
        onChange={e=>setDelFrom(e.target.value)}
      />
      <input
        type="number"
        placeholder="Видалити до"
        value={delTo}
        onChange={e=>setDelTo(e.target.value)}
      />
      <button onClick={handleDeleteEdgeClick}>Видалити ребро</button>

      <input
        type="number"
        placeholder="Початкова вершина"
        value={startVertex}
        onChange={(e)=>setStartVertex(e.target.value)}
      />
      <input
        type="number"
        placeholder="Кінцева вершина"
        value={endVertex}
        onChange={(e)=>setEndVertex(e.target.value)}
      />

      <button onClick={handleStart}>Старт</button>
      <button onClick={handleStop}>Стоп</button>
      <button onClick={handleBack}>Назад</button>
    </div>
  );
}

export default Controls;
