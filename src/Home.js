import { React, useContext } from "react";
import { Link } from 'react-router-dom';
import { SocketContext } from "./contexts/SocketContext";
const data = require('./mock/frotasMock.json');



export default function Home() {
    const { socketSend } = useContext(SocketContext);


    return (
        <>
            {
                data.map(({id, name}) => (
                    <Link 
                        key={id}
                        to={`/map/${id}`}
                        >
                        <button id={id} onClick={() => socketSend(id)}>{id} - {name}</button>
                    </Link>

                    )
                )
            }
        </>


    )
}