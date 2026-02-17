import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, trend, icon: Icon, color }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }}
  >
    <Card className="glass-card p-3 h-100 border-0">
      <div className="d-flex justify-content-between align-items-start">
        <div style={{ zIndex: 1 }}>
          
          <p className="text-white opacity-50 small text-uppercase fw-bold mb-1" style={{ letterSpacing: '1px' }}>
            {title}
          </p>
          
          <h2 className="mb-0 fw-bold text-white" style={{ fontSize: '1.8rem' }}>
            {value}
          </h2>
          <div className={`mt-2 small ${trend > 0 ? 'text-success' : 'text-danger'} fw-medium`}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% <span className="text-white opacity-25 ms-1">vs hier</span>
          </div>
        </div>
        <div className={`p-3 rounded-4 bg-${color} bg-opacity-20 text-${color} d-flex align-items-center justify-content-center shadow-sm`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
    </Card>
  </motion.div>
);

export default StatsCard;