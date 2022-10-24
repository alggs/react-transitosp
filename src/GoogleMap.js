import { React, useEffect, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useParams } from 'react-router-dom'
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
  console.log(id);
  const [busCoord, setNewGeolocalization] = useState(apiResponse)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDvDRpIjEhQJaA7wr69Z2CLRJC10E2-3XI"
  })

  useEffect(() => {
    setTimeout(() => {
      const updatedMarkersLatLong = apiResponse.map((linha) => {

        const att = linha.vs.map(onibus => {
          onibus.px = onibus.py + Math.random(1,4)
          onibus.py = onibus.px + Math.random(1,4)
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
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  console.log(id);


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultMapOptions}
      defaultZoom={10}
      zoom={10}
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