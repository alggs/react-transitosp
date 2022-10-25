import { React, useContext, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import { HomeContainer, Button } from "./styles";
const allBuslines = require('../../mock/frotasMock.json');



export default function Home() {
  const { socketSend } = useContext(SocketContext);
  const [buslineFilter, setBuslineFilter] = useState("");

  const filteredBuslines = useMemo(() => {
    const lowerCasedBuslineFilter = buslineFilter.toLocaleLowerCase();
    return allBuslines.filter(({ name }) => name.toLocaleLowerCase().includes(lowerCasedBuslineFilter));
  }, [buslineFilter]);

  return (<>
    <input type="text" onChange={(ev) => setBuslineFilter(ev.target.value)} value={buslineFilter} />
    <HomeContainer>
      {
        filteredBuslines.map(({ id, name }) => (
          <Link key={id} to={`/map/${id}`}>

            <Button id={id} onClick={() => socketSend(id)}>{id} - {name}</Button>

          </Link>

        )
        )
      }
    </HomeContainer>
  </>

  )
}