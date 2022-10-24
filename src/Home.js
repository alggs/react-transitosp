import { React } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Link } from 'react-router-dom';
const data = require('./mock/frotasMock.json');

function connectSocket(busId) {
    const socket = new W3CWebSocket('ws://127.0.0.1:3001');
    console.log(busId.target.id);

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
        <>
            {
                data.map((i) => (
                    <Link 
                        key={i.id}
                        to={`/map/${i.id}`}
                        >
                        <button id={i.id} onClick={connectSocket}>{i.id} - {i.name}</button>
                    </Link>

                    )
                )
            }
        </>


    )
}