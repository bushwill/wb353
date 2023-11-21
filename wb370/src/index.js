import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import LandingPage from './LandingPage/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

export default root;
