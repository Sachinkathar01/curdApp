import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpeedInsights>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </SpeedInsights>
  </StrictMode>
);
