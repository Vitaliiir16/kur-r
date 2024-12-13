import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { GraphProvider } from './contexts/GraphContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GraphProvider>
                <App />
            </GraphProvider>
        </BrowserRouter>
    </React.StrictMode>
);
