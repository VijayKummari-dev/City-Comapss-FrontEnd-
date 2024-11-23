// // src/index.js

// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Import from react-dom/client
// import App from './App';
// import './index.css'; // Import your global styles

// const rootElement = document.getElementById('root'); // Make sure you have a root element
// const root = ReactDOM.createRoot(rootElement); // Create a root

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
