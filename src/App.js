import {
  BrowserRouter,
} from "react-router-dom";
import React from 'react';
import { Router } from "./Router";
import { SocketContextProvider } from './contexts/SocketContext';
import { GlobalStyles } from "./styles/global";

function App() {

  return (
    <BrowserRouter>
      <SocketContextProvider>
        <GlobalStyles/>
        <Router />
      </SocketContextProvider>
    </BrowserRouter>
  );
}

export default App;