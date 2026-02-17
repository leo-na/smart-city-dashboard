import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import DashboardLayout from './features/Dashboard/DashboardLayout';
import NodesMap from './features/Dashboard/NodesMap';
import DeviceTable from './features/Dashboard/DeviceTable'; 
import SecurityCenter from './features/Dashboard/SecurityCenter';
import Settings from './features/Dashboard/Settings'; // Nouvel import
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardLayout />;
      
      case 'nodes':
        return (
          <div className="py-4">
            <h1 className="fw-bold mb-4 text-white">Gestion des Nœuds IoT</h1>
            <NodesMap />
            <div className="mt-4">
              <DeviceTable />
            </div>
          </div>
        );

      case 'security': 
        return <SecurityCenter />;

      case 'settings': 
        return <Settings />;

      default:
        return (
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <h2 className="text-white-50">Module {activeTab} non trouvé.</h2>
          </div>
        );
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col lg={2}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </Col>
        
        <Col lg={10} className="px-5" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
}

export default App;