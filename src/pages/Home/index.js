import { React, useContext } from "react";
import { Link } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import { HomeContainer, Button } from "./styles";
const data = require('../../mock/frotasMock.json');



export default function Home() {
    const { socketSend } = useContext(SocketContext);


    return (
        <HomeContainer>
            {
                data.map(({id, name}) => (
                    <Link 
                        key={id}
                        to={`/map/${id}`}
                        >
                        <Button id={id} onClick={() => socketSend(id)}>{id} - {name}</Button>
                    </Link>

                    )
                )
            }
        </HomeContainer>


    )
}