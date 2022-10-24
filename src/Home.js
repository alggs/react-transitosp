import { React, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const data = require('./mock/frotasMock.json');

function connectSocket(busId) {
    const socket = new W3CWebSocket('ws://127.0.0.1:3001');
    console.log(busId.target.id);



    // const socket = new WebSocket('ws://localhost:3000');
    // console.log("criou o websocket");

    // // Connection opened
    // socket.addEventListener('open', function (event) {
    //     console.log('Connected to WS Server')
    // });

    // // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log(JSON.parse(event.data))
    });

    socket.addEventListener('open', function (event) {
        socket.send(-1);
    });

    return socket
}

export default function Home() {
    // useEffect(() => {
    //     console.log(data);
    // });

    return (
            data.map((i) => {
                return <button id={i.id} onClick={connectSocket}>{i.id} - {i.name}</button>
            })
        
    )
}