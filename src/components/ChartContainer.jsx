import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ChartContainer = ({ title, chartData }) => (
  <div className="glass-card p-4 mt-4" style={{ height: '400px' }}>
    <h5 className="mb-4 fw-bold text-white">{title}</h5>
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
        />
        <Area 
          type="monotone" 
          dataKey="temp" 
          name="Température (°C)"
          stroke="#00d2ff" 
          strokeWidth={3} 
          fill="url(#colorTemp)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default ChartContainer;