import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ temp: 0, humidity: 0, pressure: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&hourly=temperature_2m,relative_humidity_2m,surface_pressure&forecast_days=1"
        );
        const json = await response.json();

        const formattedData = json.hourly.time.map((time, index) => ({
          time: new Date(time).getHours() + "h",
          temp: json.hourly.temperature_2m[index],
          humidity: json.hourly.relative_humidity_2m[index],
        })).slice(0, 12); 

        setData(formattedData);
        setMetrics({
          temp: json.hourly.temperature_2m[0],
          humidity: json.hourly.relative_humidity_2m[0],
          pressure: json.hourly.surface_pressure[0],
        });
        setLoading(false);
      } catch (error) {
        console.error("Erreur API:", error);
        setLoading(false);
      }
    };

    fetchData();
   
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { data, metrics, loading };
};