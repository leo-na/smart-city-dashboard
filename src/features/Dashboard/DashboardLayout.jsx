import { Row, Col, Spinner, Badge } from 'react-bootstrap';
import { Thermometer, Droplets, Wind, Cpu } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';
import StatsCard from '../../components/StatsCard';
import ChartContainer from '../../components/ChartContainer';
import DeviceTable from './DeviceTable';

const DashboardLayout = () => {
  const { data, metrics, loading } = useDashboardData();

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Spinner animation="grow" variant="primary" />
      <span className="ms-3 text-primary fw-bold">Synchronisation Nexus...</span>
    </div>
  );

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-1">Nexus IoT <Badge bg="primary" className="ms-2 small">Live Paris</Badge></h1>
          <p className="text-secondary">Statut du réseau : <span className="text-success">Optimal</span></p>
        </div>
      </div>

      <Row className="g-4">
        <Col lg={3} md={6}>
          <StatsCard title="Température" value={`${metrics.temp}°C`} trend={+2.4} icon={Thermometer} color="warning" />
        </Col>
        <Col lg={3} md={6}>
          <StatsCard title="Humidité" value={`${metrics.humidity}%`} trend={-1.2} icon={Droplets} color="primary" />
        </Col>
        <Col lg={3} md={6}>
          <StatsCard title="Pression" value={`${metrics.pressure}hPa`} trend={0} icon={Wind} color="success" />
        </Col>
        <Col lg={3} md={6}>
          <StatsCard title="Charge CPU" value="32%" trend={+5} icon={Cpu} color="info" />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <ChartContainer title="Evolution Thermique en Temps Réel" chartData={data} />
        </Col>
      </Row>

      <Row className="mb-5 mt-2">
        <Col><DeviceTable /></Col>
      </Row>
    </div>
  );
};

export default DashboardLayout;