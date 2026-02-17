import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Badge, Button, ProgressBar, Alert } from 'react-bootstrap';
import { ShieldCheck, ShieldAlert, Lock, Unlock, Eye, Activity, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SecurityCenter = () => {
  
  const [isLocked, setIsLocked] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(2);

  
  const handleScan = () => {
    setScanning(true);
    setProgress(0);
  };

  useEffect(() => {
    if (scanning && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 5), 100);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setScanning(false);
    }
  }, [scanning, progress]);

  const securityLogs = [
    { id: 1, time: "14:22:01", event: "Tentative d'intrusion bloquée", origin: "IP 192.168.1.45", level: "critical" },
    { id: 2, time: "14:15:30", event: "Mise à jour certificat SSL", origin: "Système", level: "info" },
    { id: 3, time: "13:50:12", event: "Accès autorisé : Admin_01", origin: "Terminal Principal", level: "success" },
  ];

  return (
    <div className="py-4">
      
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Alert variant="danger" className="border-0 shadow-lg d-flex align-items-center mb-4 bg-danger text-white">
              <AlertTriangle className="me-3 pulse" />
              <div>
                <strong className="d-block">PROTOCOLE LOCKDOWN ACTIF</strong>
                <small>Tous les accès externes sont révoqués. Pare-feu en mode paranoïaque.</small>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="fw-bold mb-4 text-white">Centre de Sécurité Avancé</h1>
      
      <Row className="g-4">
        <Col lg={8}>
          <div className={`glass-card p-4 h-100 transition-all ${isLocked ? 'border-danger shadow-danger' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">
                {isLocked ? <ShieldAlert className="text-danger me-2" /> : <ShieldCheck className="text-success me-2" />} 
                Statut du Réseau
              </h5>
              <Badge bg={isLocked ? "danger" : "success"} className="px-3 py-2 pulse">
                {isLocked ? "SÉCURISÉ (LOCKDOWN)" : "ACTIF"}
              </Badge>
            </div>
            
            <div className="mb-4 text-center py-5">
               <motion.div
                animate={isLocked ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
               >
                 {isLocked ? 
                    <Lock size={80} className="text-danger mb-3" /> : 
                    <ShieldCheck size={80} className="text-success mb-3 opacity-50" />
                 }
               </motion.div>
               <h3 className="fw-bold">{isLocked ? "Système Verrouillé" : "Protection Optimale"}</h3>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white-50 small">{scanning ? "Analyse en cours..." : "Niveau de menace"}</span>
                <span className={`small fw-bold ${progress > 50 ? 'text-warning' : 'text-success'}`}>{progress}%</span>
              </div>
              <ProgressBar 
                variant={isLocked ? "danger" : scanning ? "info" : "success"} 
                now={progress} 
                animated={scanning}
                style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }} 
              />
            </div>

            <div className="mt-5 d-flex gap-3">
              <Button 
                variant={isLocked ? "success" : "outline-danger"} 
                className="w-100 py-3 d-flex align-items-center justify-content-center fw-bold"
                onClick={() => setIsLocked(!isLocked)}
              >
                {isLocked ? <Unlock className="me-2" size={18} /> : <Lock className="me-2" size={18} />}
                {isLocked ? "RÉTABLIR LES ACCÈS" : "VERROUILLAGE TOTAL"}
              </Button>
              <Button 
                disabled={scanning}
                variant="primary" 
                className="w-100 py-3 d-flex align-items-center justify-content-center fw-bold"
                onClick={handleScan}
              >
                <Activity className="me-2" size={18} /> {scanning ? "SCAN EN COURS..." : "SCAN COMPLET"}
              </Button>
            </div>
          </div>
        </Col>

        
        <Col lg={4}>
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-4 text-white"><Eye className="text-primary me-2" /> Logs de Sécurité</h5>
            <ListGroup variant="flush" className="bg-transparent">
              {securityLogs.map((log) => (
                <motion.div key={log.id} whileHover={{ x: 5 }}>
                  <ListGroup.Item className="bg-transparent border-secondary border-opacity-25 px-0 py-3 text-white">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="smaller text-white-50 mb-1">{log.time}</div>
                      <Badge bg={log.level === 'critical' ? 'danger' : 'info'} pill style={{fontSize: '10px'}}>
                        {log.level.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="fw-bold small">{log.event}</div>
                    <div className="smaller text-white-50">{log.origin}</div>
                  </ListGroup.Item>
                </motion.div>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SecurityCenter;