import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeContextProvider } from './contexts/ThemeProvider';
import App from './App';

import './services/firebase';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
