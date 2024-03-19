import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
// import 'tailwindcss/base';
// import 'tailwindcss/components';
// import 'tailwindcss/utilities';
import './index.css'; // Importing custom CSS file
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
