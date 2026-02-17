import React, { useState } from 'react'; // Ne pas oublier l'import de useState
import { Table, Badge } from 'react-bootstrap';
import { Search } from 'lucide-react'; // Pour un look plus pro

const devicesData = [
  { id: "NX-88", name: "Capteur Pollution Sud", status: "Online", load: "12%", lastSeen: "2 min ago" },
  { id: "NX-42", name: "Contrôleur Feux A1", status: "Warning", load: "88%", lastSeen: "5 min ago" },
  { id: "NX-12", name: "Passerelle 5G Centre", status: "Offline", load: "0%", lastSeen: "1 hour ago" },
];

const DeviceTable = () => {
  
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredDevices = devicesData.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-card p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Terminaux Connectés</h5>
        <Badge bg="primary">{filteredDevices.length} Appareils</Badge>
      </div>

      
      <div className="position-relative mb-4">
        <Search className="position-absolute top-50 translate-middle-y ms-3 text-secondary" size={18} />
        <input 
          type="text" 
          placeholder="Rechercher par ID ou nom..." 
          className="form-control bg-dark text-white border-secondary ps-5 py-2"
          style={{ borderRadius: '10px', fontSize: '0.9rem' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table hover variant="dark" className="bg-transparent overflow-hidden">
        <thead>
          <tr className="text-muted border-bottom border-secondary small">
            <th>DEVICE ID</th>
            <th>NOM</th>
            <th>STATUT</th>
            <th>CHARGE CPU</th>
            <th>SYNC</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredDevices.length > 0 ? (
            filteredDevices.map((device, idx) => (
              <tr key={device.id} className="align-middle border-bottom border-secondary border-opacity-10">
                <td className="fw-mono text-primary small">{device.id}</td>
                <td className="fw-medium">{device.name}</td>
                <td>
                  <Badge bg={device.status === 'Online' ? 'success' : device.status === 'Warning' ? 'warning' : 'danger'} className="px-3 py-2">
                    {device.status}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{device.load}</span>
                    <div className="progress w-50" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                      <div 
                        className={`progress-bar bg-${parseInt(device.load) > 80 ? 'danger' : 'primary'}`} 
                        style={{ width: device.load }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="text-muted small">{device.lastSeen}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-5 text-muted italic">
                Aucun terminal ne correspond à votre recherche.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DeviceTable;