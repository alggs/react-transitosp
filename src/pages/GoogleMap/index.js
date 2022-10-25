import { React, useState, useCallback, useContext } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom'
import { SocketContext } from '../../contexts/SocketContext';
import { MapContainer } from './styles';


const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultMapOptions = {
  styles: [
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
};

export default function MyComponent() {

  const { id } = useParams();
  const { busCoord } = useContext(SocketContext);
  console.log(id);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDvDRpIjEhQJaA7wr69Z2CLRJC10E2-3XI"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    var Item_1 = new window.google.maps.LatLng(-23.41526871496453, -47.012811650504254);
    var myPlace = new window.google.maps.LatLng(-23.751312371466952, -46.278101016818205);
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(myPlace);
    bounds.extend(Item_1);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultMapOptions}
      >
        {console.log(busCoord)}
        {busCoord.map((linha) => {
          return (
            linha.vs.map((frota) => {
              return (<Marker
                key={frota.p}
                position={{
                  lat: frota.py,
                  lng: frota.px
                }}
                icon={"http://maps.google.com/mapfiles/kml/shapes/bus.png"}
              >
              </Marker>)
            })
          )
        }
        )}
      </GoogleMap>
    </MapContainer>
  ) : <></>
}