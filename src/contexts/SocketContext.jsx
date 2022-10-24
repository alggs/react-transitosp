import { createContext, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const buslinesCoordinates = require('../mock/frotasFiltradasMock.json');


export const SocketContext = createContext({});


let bussesCoordinates = {};

export function SocketContextProvider({ children }) {

    const socket = new W3CWebSocket('wss://127.0.0.1:3001');

    socket.addEventListener('message', function (event) {
      console.log('MESSAGE RECIVED');
      console.log(JSON.parse(event.data))
    });
    
    socket.addEventListener('open', function (event) {
      socket.send(-1);
    });

    function socketSend(id) {
        console.log(`ENVIANDO PRO SOCKET ${id}`)
        socket.send(id);
    }

    function socketClose() {
        socket.close();
    }

    function getAllBuses() {
        console.log('GETTINT ALL BUSES');
        socket.send(-1);
    }

    const [busCoord, setBusCoord] = useState(buslinesCoordinates)

    setTimeout(() => {
        const updatedBussesCoordinates = buslinesCoordinates.map((linha) => {
  
          const att = linha.vs.map(onibus => {
            onibus.px = onibus.py + Math.random(1,4)
            onibus.py = onibus.px + Math.random(1,4)
            return onibus;
          })
          return { ...linha, att }
        });
        setBusCoord(updatedBussesCoordinates)
      }, 3000);


    return (
        <SocketContext.Provider value={{socket, socketSend, socketClose, getAllBuses, busCoord}}>
            { children }
        </SocketContext.Provider>
    )
}


function mockMovingBus() {

}