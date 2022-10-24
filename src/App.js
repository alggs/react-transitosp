import {
  BrowserRouter,
} from "react-router-dom";
import React from 'react';
import { Router } from "./Router";
import { SocketContextProvider } from './contexts/SocketContext';

function App() {

  return (
    <BrowserRouter>
      <SocketContextProvider>
        <Router />
      </SocketContextProvider>
    </BrowserRouter>
  );
}

export default App;