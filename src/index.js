import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import App from './App';
import AppPage from './pages/app-page';
import DaoPage from './pages/dao-page';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<AppPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/dao" element={<DaoPage />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.querySelector('#root')
);
