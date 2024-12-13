import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GraphPage from './components/Graph/GraphPage';
import DataStructurePage from './components/DataStructure/DataStructurePage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/graph" />} /> 
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/data-structure" element={<DataStructurePage />} />
        </Routes>
    );
}

export default App;
