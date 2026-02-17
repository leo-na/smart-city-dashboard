import { Table, Badge } from 'react-bootstrap';

const devices = [
  { id: "NX-88", name: "Capteur Pollution Sud", status: "Online", load: "12%", lastSeen: "2 min ago" },
  { id: "NX-42", name: "Contrôleur Feux A1", status: "Warning", load: "88%", lastSeen: "5 min ago" },
  { id: "NX-12", name: "Passerelle 5G Centre", status: "Offline", load: "0%", lastSeen: "1 hour ago" },
];

const DeviceTable = () => (
  <div className="glass-card p-4 mt-4">
    <h5 className="mb-4 fw-bold">Terminaux Connectés</h5>
    <Table hover variant="dark" className="bg-transparent">
      <thead>
        <tr className="text-muted border-bottom border-secondary">
          <th>DEVICE ID</th>
          <th>NOM</th>
          <th>STATUT</th>
          <th>CHARGE CPU</th>
          <th>SYNC</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device, idx) => (
          <tr key={idx} className="align-middle border-bottom border-secondary border-opacity-25">
            <td className="fw-mono text-primary">{device.id}</td>
            <td>{device.name}</td>
            <td>
              <Badge bg={device.status === 'Online' ? 'success' : device.status === 'Warning' ? 'warning' : 'danger'} className="px-3 py-2">
                {device.status}
              </Badge>
            </td>
            <td>{device.load}</td>
            <td className="text-muted small">{device.lastSeen}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default DeviceTable;