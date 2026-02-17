import React, { useState } from 'react';
import { Row, Col, Form, Button, Badge } from 'react-bootstrap'; // Supprimé Switch d'ici
import { Settings as SettingsIcon, Bell, Monitor, Database, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="py-4 text-white"
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold m-0">Configuration Système</h1>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <Save size={18} /> Sauvegarder
        </Button>
      </div>

      <Row className="g-4">
        {/* Interface */}
        <Col lg={6}>
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4 d-flex align-items-center text-primary">
              <Monitor className="me-2" size={20} /> Interface Utilisateur
            </h5>
            <Form>
              <Form.Group className="mb-4 d-flex justify-content-between align-items-center">
                <div>
                  <Form.Label className="mb-0 fw-bold">Mode Sombre</Form.Label>
                  <div className="small text-white-50">Optimisation du rendu visuel.</div>
                </div>
                {/* Utilisation correcte du Switch dans React-Bootstrap */}
                <Form.Check 
                  type="switch" 
                  id="dark-mode-switch" 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)}
                />
              </Form.Group>
            </Form>
          </div>
        </Col>

        {/* État API */}
        <Col lg={12}>
          <div className="glass-card p-4">
            <h5 className="mb-4 d-flex align-items-center text-info">
              <Database className="me-2" size={20} /> Statut des Services
            </h5>
            <div className="table-responsive">
              <table className="table table-dark table-borderless m-0">
                <thead>
                  <tr className="text-white-50 small">
                    <th>Service</th>
                    <th>Point de terminaison</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody className="small">
                  <tr>
                    <td>Open-Meteo API</td>
                    <td>api.open-meteo.com</td>
                    <td><Badge bg="success">En ligne</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Settings;