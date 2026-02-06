'use client';

import { Map as MapGL, Marker, NavigationControl, Popup } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState } from 'react';

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=dP6zOJ4NHO0dopwKwMXD';
interface MapComponentProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
}

const MapComponent = ({ className = '', center = [-111.8651523, 33.7422526], zoom = 14 }: MapComponentProps) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={className}>
      <MapGL
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: zoom,
        }}
        mapStyle={MAP_STYLE_URL || 'https://demotiles.maplibre.org/style.json'}
      >
        <NavigationControl position="top-right" />

        <Marker longitude={center[0]} latitude={center[1]} color="#1E88E5" onClick={() => setShowPopup(true)} />

        {showPopup && (
          <Popup
            longitude={center[0]}
            latitude={center[1]}
            offset={25}
            onClose={() => setShowPopup(false)}
            closeButton={true}
            closeOnClick={false}
          >
            <div style={{ color: '#000' }}>
              <strong>Advanced Dentistry & Implant Center</strong>
              <br />
              10031 E Dynamite Blvd Ste 200
              <br />
              Scottsdale, AZ 85262
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};

export default MapComponent;
