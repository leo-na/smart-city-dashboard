import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import DashboardLayout from './features/Dashboard/DashboardLayout';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  // État pour savoir quel onglet est actif
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col lg={2}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </Col>
        <Col lg={10} className="px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' ? <DashboardLayout /> : 
               <div className="vh-100 d-flex align-items-center justify-content-center">
                 <h2 className="text-white-50">Module {activeTab} en cours de développement...</h2>
               </div>
              }
            </motion.div>
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
}

export default App;