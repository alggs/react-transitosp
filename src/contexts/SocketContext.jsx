import { useEffect } from "react";
import { createContext, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export const SocketContext = createContext({});


let bussesCoordinates = [];

export function SocketContextProvider({ children }) {

  const socket = new W3CWebSocket('ws://127.0.0.1:3001');

  const [theSocket, setTheSocket] = useState(socket);
  const [busCoord, setBusCoord] = useState(bussesCoordinates)

  useEffect(() => {

    socket.addEventListener('message', function (event) {
      console.log('MESSAGE RECEIVED'); // TODO ALGGS receber mensagens do servidor
      console.log(JSON.parse(event.data))
      bussesCoordinates = JSON.parse(event.data);
      if (bussesCoordinates.length <= 2) {
        setBusCoord(bussesCoordinates)
      }
    });

    socket.addEventListener('open', function (event) {
      socket.send(-1);
    });


    socket.socketSend = function socketSend(id) {
      console.log(`ENVIANDO PRO SOCKET ${id}`);
      // TODO ALGGS enviar id para o socket
      socket.send(id);
    }

    socket.socketClose = function socketClose() {
      socket.close();
    }

    socket.getAllBuses = function getAllBuses() {
      console.log('GETTINT ALL BUSES');
      // TODO ALGGS buscar todos os busses, adicionar naquela variãável de "frotas mock"
      socket.send(-1);
    }

    return () => socket.close()
  }, [])

  return (
    <SocketContext.Provider value={{ socketSend: theSocket.socketSend, socketClose: theSocket.socketClose, busCoord }}>
      {children}
    </SocketContext.Provider>
  )
}