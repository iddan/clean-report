import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const url = new URL(window.location.href);
const cell = url.searchParams.get('cell');

ReactDOM.render(<App cell={ cell } />, document.getElementById('root'));
registerServiceWorker();
