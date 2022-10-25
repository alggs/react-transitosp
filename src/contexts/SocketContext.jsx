import { useEffect } from "react";
import { createContext, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export const SocketContext = createContext({});

let socket;
let bussesCoordinates = [];

export function SocketContextProvider({ children }) {

  if(!socket){
    socket = new W3CWebSocket('ws://127.0.0.1:3001');
  }

  const [theSocket, setTheSocket] = useState(socket);
  const [busCoord, setBusCoord] = useState(bussesCoordinates)

  useEffect(() => {

    socket.addEventListener('message', function (event) {
      console.log('MESSAGE RECEIVED');
      console.log(JSON.parse(event.data))
      bussesCoordinates = JSON.parse(event.data);
      if (bussesCoordinates.length <= 2) {
        setBusCoord(bussesCoordinates)
      }
    });

    socket.addEventListener('open', function (event) {
      console.log("CONNECTION OPEN, GETTING ALL BUSES");
      socket.send(-1);
    });

    socket.addEventListener('close', function (event) {
      setBusCoord([])
    });


    socket.socketSend = function socketSend(id) {
      console.log(`SEND TO SOCKET ${id}`);
      socket.send(id);
    }

    return () => socket.close()
  }, [])

  return (
    <SocketContext.Provider value={{ socket, busCoord}}>
      {children}
    </SocketContext.Provider>
  )
}