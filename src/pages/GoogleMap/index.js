import { React, useEffect, useState, useCallback, useContext } from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useParams } from 'react-router-dom'
import { SocketContext } from '../../contexts/SocketContext';
import { MapContainer } from './styles';


const containerStyle = {
  width: '100%',
  height: '100%',
  // featureType: "poi",
  // elementType: "labels",
  // stylers: [
  //   { visibility: "off" }
  // ]
};

const center = {
  lat: -23.564329998473877,
  lng: -46.628554132540366
};

const defaultMapOptions = {
  styles: [
    // {
    //   "featureType": "all",
    //   "elementType": "labels.text",
    //   "stylers": [
    //     {
    //       "visibility": "off"
    //     }
    //   ]
    // },
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
    const bounds = new window.google.maps.LatLngBounds(center);
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
        // center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultMapOptions}
        defaultZoom={10}
        zoom={10}
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
              // onClick={() => {console.log("cliquei")}}
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