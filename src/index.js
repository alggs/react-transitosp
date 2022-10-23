import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GoogleMap from './GoogleMap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="map" element={<GoogleMap />} />
    </Routes>
  </BrowserRouter>
);