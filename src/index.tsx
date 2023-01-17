import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './routes/login';
import * as Sentry from '@sentry/react';
import { UserContextProvider } from './context/user-context';
import reportWebVitals from './reportWebVitals';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://6d10681d40974885b2f71731d833ba98@o4504445689331712.ingest.sentry.io/4504520707866624',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route
            path="/"
            element={<App />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
