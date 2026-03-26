import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './HollemanMap.css';

// Fix default marker icons broken by webpack asset hashing
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom green brand marker
const brandIcon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="32" height="44">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 28 16 28S32 26.5 32 16C32 7.163 24.837 0 16 0z" fill="#136B38"/>
    <circle cx="16" cy="16" r="7" fill="white"/>
    <circle cx="16" cy="16" r="4" fill="#136B38"/>
  </svg>`,
  iconSize: [32, 44],
  iconAnchor: [16, 44],
  popupAnchor: [0, -46],
});

export interface MapLocation {
  name: string;
  position: [number, number];
  address: string;
  phone: string;
  email: string;
  website?: string;
}

export const locations: MapLocation[] = [
  {
    name: 'București – Jilava',
    position: [44.3391, 26.1024],
    address: 'Șoseaua de Centură nr. 29, Jilava, jud. Ilfov',
    phone: '+40 21 321 38 22 / 321 61 82\n+40 744 317 713 / +40 745 017 529',
    email: 'info@holleman.ro',
  },
  {
    name: 'Constanța – Port Agigea Sud',
    position: [43.7850, 28.6030],
    address: 'Port Agigea Sud CT, cladirea TLS, parter, Biroul 1, Constanța, cod 907015',
    phone: '+40 744 678 100 / +40 754 016 285',
    email: 'info@holleman.ro',
  },
  {
    name: 'Bulgaria – Rousse',
    position: [43.8564, 25.9662],
    address: '72 Tutrakan Blvd., 7000 Rousse, Bulgaria',
    phone: '+359 82 842 886 / +359 88 621 1715',
    email: 'info@holleman.bg',
    website: 'www.holleman.bg',
  },
  {
    name: 'Serbia – Beograd',
    position: [44.8150, 20.4781],
    address: 'Milinka Kusica 1/3, 11250 Beograd, Serbia',
    phone: '+381 11 657 1 307 / +381 63 770 9 039',
    email: 'info@holleman.rs',
    website: 'www.holleman.rs',
  },
  {
    name: 'Germany – Pfreimd',
    position: [49.4752, 12.1705],
    address: 'P. Schwandner Logistik & Transport GmbH\nAm Kalvarienberg 17, DE-92536 Pfreimd',
    phone: '+49 (0)96 06 / 92 19–0 / +49 (0)96 06 / 92 19–19',
    email: 'info@schwandner-logistik.de',
    website: 'www.schwandner-logistik.de',
  },
  {
    name: 'Netherlands – Bergen op Zoom',
    position: [51.4969, 4.2878],
    address: 'Lelyweg 12, 4612 PS Bergen op Zoom',
    phone: '+31 (0)166 61 23 15',
    email: 'sales@degroentransport.nl',
    website: 'www.degroentransport.nl',
  },
];

// Center the map roughly over Central/Eastern Europe
const MAP_CENTER: [number, number] = [50.5, 20.0];
const MAP_ZOOM = 4;

const HollemanMap: React.FC = () => {
  useEffect(() => {
    // Ensure default icon is set (needed with CRA webpack)
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      scrollWheelZoom={false}
      className="holleman-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={loc.position} icon={brandIcon}>
          <Popup className="holleman-popup">
            <div className="popup-content">
              <h3 className="popup-title">{loc.name}</h3>
              <p className="popup-address">
                {loc.address.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
              <p className="popup-phone">
                {loc.phone.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
              <a className="popup-email" href={`mailto:${loc.email}`}>{loc.email}</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HollemanMap;
