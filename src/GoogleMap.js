import { React, useEffect, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
const apiResponse = require('./mock/frotasFiltradasMock.json');

const containerStyle = {
  width: '1500px',
  height: '700px',
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

export default function MyComponent() {

  const [busCoord, setNewGeolocalization] = useState(apiResponse)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDvDRpIjEhQJaA7wr69Z2CLRJC10E2-3XI"
  })

  useEffect(() => {
    setTimeout(() => {
      const updatedMarkersLatLong = apiResponse.map((linha) => {

        const att = linha.vs.map(onibus => {
          onibus.px = onibus.px + Math.random()
          onibus.py = onibus.py + Math.random()
          return onibus;
        })
        return { ...linha, att }
      });
      setNewGeolocalization(updatedMarkersLatLong)
    }, 5000);
  }, [busCoord]);

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
    map.setZoom(1);
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
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
  ) : <></>
}