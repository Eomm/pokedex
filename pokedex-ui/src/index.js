import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient, Provider } from 'urql';

const API_BASE_URL = '';

const client = createClient({
  url: `${API_BASE_URL}/graphql`,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider value={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
