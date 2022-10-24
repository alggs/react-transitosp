import { w3cwebsocket as W3CWebSocket } from "websocket";
import { positionService } from "./positionService";
const apiResponse = require('../mock/frotasFiltradasMock.json');

const socket = new W3CWebSocket('ws://127.0.0.1:3001');

export const socketService = {

    initiateSocket: () => connectSocket(),
    clearSocket: () => disconnect()

}

function connectSocket() {

    socket.addEventListener('message', function (event) {

        setTimeout(() => {


            const updatedMarkersLatLong = apiResponse.map((linha) => {

                const att = linha.vs.map(onibus => {
                    onibus.px = onibus.py + Math.random(1, 4)
                    onibus.py = onibus.px + Math.random(1, 4)
                    return onibus;
                })

                return { ...linha, att }

            });

            positionService.propagatePositions(updatedMarkersLatLong);

        }, 5000);



        // positionService.propagatePositions(JSON.parse(event.data)); TODO descomentar depois
        console.log(JSON.parse(event.data));
    });

    socket.addEventListener('open', function (event) {
        socket.send(-1);
    });

    return socket;
}

function disconnect() {
    socket.close();
}