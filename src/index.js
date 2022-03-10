import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';
import { AppContextProvider } from './Context/context';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
