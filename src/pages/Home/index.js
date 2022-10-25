import { React, useContext, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import { HomeContainer, Button, Input, HeaderContainer } from "./styles";
const allBuslines = require('../../mock/frotasMock.json');



export default function Home() {
  const { socket } = useContext(SocketContext);
  const [buslineFilter, setBuslineFilter] = useState("");

  const filteredBuslines = useMemo(() => {
    const lowerCasedBuslineFilter = buslineFilter.toLocaleLowerCase();
    return allBuslines.filter(({ name }) => name.toLocaleLowerCase().includes(lowerCasedBuslineFilter));
  }, [buslineFilter]);

  return (<>
    <HeaderContainer>
      <Input type="text" placeholder="Pesquisar..." onChange={(ev) => setBuslineFilter(ev.target.value)} value={buslineFilter} />
    </HeaderContainer>
    <HomeContainer>
      {
        filteredBuslines.map(({ id, name }) => (
          <Link key={id} to={`/map/${id}`}>

            <Button id={id} onClick={() => socket.socketSend(id)}>{id} - {name}</Button>

          </Link>

        )
        )
      }
    </HomeContainer>
  </>

  )
}