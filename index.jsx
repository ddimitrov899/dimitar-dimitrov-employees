import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './src/app';

ReactDOMClient.createRoot(document.getElementById('employees')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>)
