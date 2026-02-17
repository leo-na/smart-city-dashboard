import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from 'react-bootstrap';
import L from 'leaflet';

// Correction icône Leaflet (bug classique avec Webpack/Vite)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
const customIcon = new L.Icon({ iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41] });

const nodes = [
  { id: 1, name: "Node-Paris-Sud", position: [48.83, 2.35], status: "Online" },
  { id: 2, name: "Node-Paris-Nord", position: [48.89, 2.34], status: "Warning" },
  { id: 3, name: "Gateway-Est", position: [48.85, 2.40], status: "Online" }
];

const NodesMap = () => {
  return (
    <div className="glass-card p-4 h-100" style={{ minHeight: '500px' }}>
      <h4 className="mb-4 fw-bold text-white">Géolocalisation des Nœuds</h4>
      <div style={{ height: '400px', borderRadius: '15px', overflow: 'hidden' }}>
        <MapContainer center={[48.8566, 2.3522]} zoom={12} style={{ height: '100%', width: '100%' }}>
          {/* TileLayer en mode sombre pour matcher ton IHM */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          />
          {nodes.map(node => (
            <Marker key={node.id} position={node.position} icon={customIcon}>
              <Popup>
                <div className="text-dark">
                  <strong>{node.name}</strong><br/>
                  Statut: <Badge bg={node.status === 'Online' ? 'success' : 'warning'}>{node.status}</Badge>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default NodesMap;