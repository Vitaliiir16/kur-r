import React, { useState, useContext } from 'react';
import { GraphContext } from '../../contexts/GraphContext';

const Controls = () => {
    const {
        addEdge,
        deleteEdge,
        findEdge
    } = useContext(GraphContext);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [weight, setWeight] = useState('');

    const [deleteFrom, setDeleteFrom] = useState('');
    const [deleteTo, setDeleteTo] = useState('');

    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');

    const handleAddEdge = (e) => {
        e.preventDefault();
        const fromVal = parseInt(from);
        const toVal = parseInt(to);
        const weightVal = parseFloat(weight);

        if (!isNaN(fromVal) && !isNaN(toVal) && !isNaN(weightVal)) {
            addEdge(fromVal, toVal, weightVal);
            setFrom('');
            setTo('');
            setWeight('');
        }
    };

    const handleDeleteEdge = (e) => {
        e.preventDefault();
        const fromVal = parseInt(deleteFrom);
        const toVal = parseInt(deleteTo);

        if (!isNaN(fromVal) && !isNaN(toVal)) {
            deleteEdge(fromVal, toVal);
            setDeleteFrom('');
            setDeleteTo('');
        }
    };

    const handleFindEdge = (e) => {
        e.preventDefault();
        const fromVal = parseInt(searchFrom);
        const toVal = parseInt(searchTo);

        if (!isNaN(fromVal) && !isNaN(toVal)) {
            findEdge(fromVal, toVal);
            setSearchFrom('');
            setSearchTo('');
        }
    };

    return (
        <div>
            <div className="controls">
                <input
                    type="number"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Від"
                />
                <input
                    type="number"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="До"
                />
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Вага"
                    step="0.1"
                />
                <button onClick={handleAddEdge}>Додати ребро</button>
            </div>

            <div className="controls">
                <input
                    type="number"
                    value={deleteFrom}
                    onChange={(e) => setDeleteFrom(e.target.value)}
                    placeholder="Видалити від"
                />
                <input
                    type="number"
                    value={deleteTo}
                    onChange={(e) => setDeleteTo(e.target.value)}
                    placeholder="Видалити до"
                />
                <button onClick={handleDeleteEdge}>Видалити ребро</button>
            </div>

            <div className="controls">
                <input
                    type="number"
                    value={searchFrom}
                    onChange={(e) => setSearchFrom(e.target.value)}
                    placeholder="Знайти від"
                />
                <input
                    type="number"
                    value={searchTo}
                    onChange={(e) => setSearchTo(e.target.value)}
                    placeholder="Знайти до"
                />
                <button onClick={handleFindEdge}>Знайти ребро</button>
            </div>

            <div className="controls">
                <span>Вкажіть початкову та кінцеву вершини</span>
            </div>
        </div>
    );
};

export default Controls;
