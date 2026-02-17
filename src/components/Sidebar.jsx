import { Nav } from 'react-bootstrap';
import { LayoutDashboard, Database, ShieldAlert, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'nodes', icon: Database, label: 'Nœuds IoT' },
  { id: 'security', icon: ShieldAlert, label: 'Sécurité' },
  { id: 'settings', icon: Settings, label: 'Configuration' },
];

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="sidebar p-4 d-none d-lg-flex flex-column">
    <div className="mb-5 d-flex align-items-center">
      <div className="bg-primary p-2 rounded-3 me-2 shadow-primary">
        <Database size={24} color="white" />
      </div>
      <h4 className="mb-0 fw-bold text-white">NEXUS<span className="text-primary">.io</span></h4>
    </div>

    <Nav className="flex-column gap-2">
      {menuItems.map((item) => (
        <div key={item.id} className="position-relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(item.id)}
            className={`d-flex align-items-center p-3 rounded-3 transition-all ${
              activeTab === item.id ? 'text-white' : 'text-secondary'
            }`}
            style={{ 
              cursor: 'pointer',
              background: activeTab === item.id ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
              zIndex: 2
            }}
          >
            <item.icon size={20} className={`me-3 ${activeTab === item.id ? 'text-primary' : ''}`} />
            <span className="fw-medium">{item.label}</span>
            
            {/* Indicateur visuel à droite */}
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeBar"
                className="position-absolute end-0 bg-primary"
                style={{ width: '4px', height: '60%', borderRadius: '4px 0 0 4px' }}
              />
            )}
          </motion.div>
        </div>
      ))}
    </Nav>

    <div className="mt-auto border-top border-secondary border-opacity-25 pt-4">
      <div className="d-flex align-items-center p-3 text-danger opacity-75 cursor-pointer hover-opacity-100">
        <LogOut size={20} className="me-3" />
        <span className="fw-medium">Déconnexion</span>
      </div>
    </div>
  </div>
);

export default Sidebar;