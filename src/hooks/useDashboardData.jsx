import { useState, useEffect, useCallback } from 'react';

export const useDashboardData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ temp: 0, humidity: 0, pressure: 0, city: "Paris" });
  // Coordonnées actuelles (Paris par défaut)
  const [coords, setCoords] = useState({ lat: 48.8566, lon: 2.3522, name: "Paris" });

  const fetchData = useCallback(async (lat, lon, name) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,surface_pressure&forecast_days=1`
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
        city: name
      });
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(coords.lat, coords.lon, coords.name);
  }, [coords, fetchData]);

  // Fonction pour changer de ville
  const searchCity = async (cityName) => {
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`);
      const json = await res.json();
      if (json.results && json.results.length > 0) {
        const result = json.results[0];
        setCoords({ lat: result.latitude, lon: result.longitude, name: result.name });
      }
    } catch (error) {
      alert("Ville non trouvée");
    }
  };

  return { data, metrics, loading, searchCity };
};