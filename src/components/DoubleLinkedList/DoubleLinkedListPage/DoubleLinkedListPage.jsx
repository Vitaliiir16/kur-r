import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DoublyLinkedList } from '../operations/DoublyLinkedList';
import ListCanvas from '../ListCanvas/ListCanvas';
import { Link } from 'react-router-dom';
import './DoubleLinkedListPage.css';

function DoubleLinkedListPage() {
  const [list] = useState(new DoublyLinkedList());
  const [version, setVersion] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [foundIndex, setFoundIndex] = useState(-1);
  const canvasRef = useRef(null);

  const draw = useCallback(() => {
    const arr = list.toArray();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000';

    if (arr.length === 0) {
      ctx.fillText('Список порожній', canvas.width/2, canvas.height/2);
      return;
    }

    const nodeWidth = 40;
    const nodeHeight = 40;
    const gap = 100;
    let x = 70;
    const y = 100;

    for (let i=0; i<arr.length; i++) {
      if (i === foundIndex) {
        ctx.strokeStyle = '#FF0000'; // Підсвічуємо знайдений елемент
      } else {
        ctx.strokeStyle = '#000000'; 
      }

      ctx.strokeRect(x, y, nodeWidth, nodeHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(arr[i].toString(), x + nodeWidth/2, y + nodeHeight/2);

      // Стрілка вліво для не першого елемента
      if (i > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y+nodeHeight/2);
        ctx.lineTo(x - 20, y+nodeHeight/2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - 15, y+nodeHeight/2 - 5);
        ctx.lineTo(x - 20, y+nodeHeight/2);
        ctx.lineTo(x - 15, y+nodeHeight/2 + 5);
        ctx.fill();
      }

      // Стрілка вправо для не останнього елемента
      if (i < arr.length - 1) {
        ctx.beginPath();
        ctx.moveTo(x+nodeWidth, y+nodeHeight/2);
        ctx.lineTo(x+nodeWidth+20, y+nodeHeight/2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x+nodeWidth+15, y+nodeHeight/2 - 5);
        ctx.lineTo(x+nodeWidth+20, y+nodeHeight/2);
        ctx.lineTo(x+nodeWidth+15, y+nodeHeight/2 + 5);
        ctx.fill();
      }

      x += gap;
    }
  }, [list, foundIndex]); // version видалено з залежностей

  useEffect(() => {
    draw();
  }, [draw, version, foundIndex]);

  const handleAdd = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      list.add(val);
      setVersion(v=>v+1);
      setFoundIndex(-1);
      setInputValue('');
    }
  };

  const handleDelete = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      list.remove(val);
      setVersion(v=>v+1);
      setFoundIndex(-1);
      setInputValue('');
    }
  };

  const handleFind = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      const idx = list.find(val);
      if (idx === -1) {
        alert(`Елемент ${val} не знайдено`);
      }
      setFoundIndex(idx);
      setVersion(v=>v+1);
      setInputValue('');
    }
  };

  return (
    <div className="dll-container">
      <div className="dll-controls">
        <input
          type="number"
          placeholder="Значення"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>Додати</button>
        <button onClick={handleDelete}>Видалити</button>
        <button onClick={handleFind}>Пошук</button>
        <Link to="/"><button>На головну</button></Link>
      </div>
      <div className="dll-visual">
        <div className="dll-title">Двозв'язний список</div>
        <ListCanvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default DoubleLinkedListPage;
