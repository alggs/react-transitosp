import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom";
import Home from './Home';
import GoogleMap from './GoogleMap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map/:id" element={<GoogleMap />} />
    </Routes>
  </BrowserRouter>
);