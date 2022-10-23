import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1500px',
  height: '700px'
};

const center = {
  lat: -23.6126345,
  lng: -46.4645915
};


const position = {
  lat: -23.6126845,
  lng: -46.4445915
};


function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "TOKEN AQUI"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        id = {"teste"}
        position={position}
        icon= {"http://maps.google.com/mapfiles/kml/shapes/bus.png"}
        >
      </Marker>
      <Marker
        position={{
          lat: -23.6126345,
          lng: -46.4645915
        }}
        icon= {"http://maps.google.com/mapfiles/kml/shapes/bus.png"}
        ></Marker>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)