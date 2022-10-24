import { React, useEffect, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';

const containerStyle = {
  width: '1500px',
  height: '700px'
};

const center = {
  lat: -23.564329998473877,
  lng: -46.628554132540366
};

export default function MyComponent() {
  let apiResponse = [
    {
      p: 21705,
      a: true,
      ta: "2022-10-23T19:17:07Z",
      py: -23.486624499999998,
      px: -46.5684925
    },
    {
      p: 21749,
      a: true,
      ta: "2022-10-23T19:17:36Z",
      py: -23.54384675,
      px: -46.618070125
    },
    {
      p: 21717,
      a: true,
      ta: "2022-10-23T19:18:47Z",
      py: -23.4819775,
      px: -46.571059500000004
    },
    {
      p: 21709,
      a: true,
      ta: "2022-10-23T19:18:30Z",
      py: -23.4819775,
      px: -46.571059500000004
    }
  ];

  const [busCoord, setNewGeolocalization] = useState(apiResponse)

  // -----------------------------------------------------

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDvDRpIjEhQJaA7wr69Z2CLRJC10E2-3XI"
  })

  useEffect(() => {
    setTimeout(() => {
      const updatedMarkersLatLong = apiResponse.map((marker) => ({
        py: marker.py + Math.random(),
        px: marker.px + Math.random()
      }));  

      console.log(updatedMarkersLatLong);
      setNewGeolocalization(updatedMarkersLatLong)
    }, 7000);
  }, [busCoord] );



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
        {busCoord.map((marker) => {
          return (<Marker
            key={marker.p}
            position={{
              lat: marker.py,
              lng: marker.px
            }}
            icon={"http://maps.google.com/mapfiles/kml/shapes/bus.png"}
          />)
        })}
      </GoogleMap>
  ) : <></>
}