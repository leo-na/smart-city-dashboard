import React, { useState, useEffect } from 'react';
import { Form, ListGroup, InputGroup, Badge } from 'react-bootstrap'; // Import Badge vérifié
import { Search, MapPin } from 'lucide-react';

const CitySelector = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      
      if (query.length >= 3) {
        try {
          const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=fr&format=json`);
          const json = await res.json();
          
          
          setSuggestions(json.results || []);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Erreur API Geocoding:", err);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchCities, 400); 
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (city) => {
    setQuery(city.name);
    setShowSuggestions(false);
    onSearch(city.name); 
  };

  return (
    <div className="position-relative w-100">
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup className="glass-card border-0 p-1">
          <InputGroup.Text className="bg-transparent border-0 text-primary">
            <MapPin size={20} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Rechercher une ville..."
            className="bg-transparent border-0 text-white shadow-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Form>

      {showSuggestions && suggestions.length > 0 && (
        <ListGroup className="position-absolute w-100 mt-2 shadow-lg z-3 border-0 overflow-hidden" style={{ borderRadius: '12px' }}>
          {suggestions.map((city) => (
            <ListGroup.Item 
              key={city.id} 
              action
              onClick={() => handleSelect(city)}
              className="bg-dark text-white border-secondary border-opacity-25 py-2 hover-primary"
              style={{ background: '#1e293b' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  <strong>{city.name}</strong>
                  <small className="text-muted ms-2">
                    {city.admin1 ? `${city.admin1}, ` : ""}{city.country}
                  </small>
                </span>
                <Badge bg="info" style={{ fontSize: '10px' }}>{city.country_code}</Badge>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default CitySelector;