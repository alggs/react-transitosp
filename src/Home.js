import { React } from "react";
import { Link } from 'react-router-dom';
const data = require('./mock/frotasMock.json');
const { socketService } = require('./services/socketService');


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
                        <button id={i.id} onClick={socketService.initiateSocket}>{i.id} - {i.name}</button>
                    </Link>

                    )
                )
            }
        </>


    )
}