import { Row, Col, Spinner, Badge } from 'react-bootstrap';
import { Thermometer, Droplets, Wind, Cpu } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';
import StatsCard from '../../components/StatsCard';
import ChartContainer from '../../components/ChartContainer';
import DeviceTable from './DeviceTable';
import CitySelector from './CitySelector';

const DashboardLayout = () => {
  const { data, metrics, loading, searchCity } = useDashboardData();

  return (
    <div className="py-4">
      
      <Row className="align-items-center mb-4 g-3">
        <Col lg={6} md={12}>
          <h1 className="fw-bold m-0 text-white">
            Nexus IoT <Badge bg="primary" className="ms-2 shadow-primary">{metrics.city}</Badge>
          </h1>
          <p className="text-secondary mb-0 small">Surveillance des nœuds environnementaux en temps réel</p>
        </Col>
        <Col lg={6} md={12}>
          <CitySelector onSearch={searchCity} />
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="grow" variant="primary" />
          <span className="mt-3 text-primary fw-bold">Récupération des données mondiales...</span>
        </div>
      ) : (
        <>
          
          <Row className="g-4">
            <Col lg={3} md={6}>
              <StatsCard 
                title="Température" 
                value={`${metrics.temp}°C`} 
                trend={+1.2} 
                icon={Thermometer} 
                color="warning" 
              />
            </Col>
            <Col lg={3} md={6}>
              <StatsCard 
                title="Humidité" 
                value={`${metrics.humidity}%`} 
                trend={-0.5} 
                icon={Droplets} 
                color="primary" 
              />
            </Col>
            <Col lg={3} md={6}>
              <StatsCard 
                title="Pression" 
                value={`${metrics.pressure} hPa`} 
                trend={0.1} 
                icon={Wind} 
                color="success" 
              />
            </Col>
            <Col lg={3} md={6}>
              <StatsCard 
                title="Charge CPU" 
                value="24%" 
                trend={+3} 
                icon={Cpu} 
                color="info" 
              />
            </Col>
          </Row>

          
          <Row className="mt-2">
            <Col lg={12}>
              <ChartContainer 
                title={`Analyse Thermique (12h) : ${metrics.city}`} 
                chartData={data} 
              />
            </Col>
          </Row>

          
          <Row className="mt-4 mb-5">
            <Col lg={12}>
              <DeviceTable />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;