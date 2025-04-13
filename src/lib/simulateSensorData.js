import { useState } from 'react';
import axios from 'axios';
import AlertStatus from './AlertStatus';
import AlertHistory from './AlertHistory';
import { generateMockData } from '@/lib/simulateSensor';

export default function SimulateSensor() {
  const [sensorData, setSensorData] = useState([]);
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/sensor-data', { data: sensorData });
      const result = response.data.anomaly ? 'Threat Detected' : 'No Threat';
      setStatus(result);

      setHistory((prev) => [
        ...prev,
        { anomaly: response.data.anomaly, timestamp: new Date().toLocaleString() },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error detecting threat');
    }
  };

  return (
    <div>
      <h1>Simulate Sensor Data</h1>
      {[...Array(13)].map((_, index) => (
        <input
          key={index}
          type="number"
          placeholder={`Feature ${index + 1}`}
          onChange={(e) =>
            setSensorData((prev) => {
              const newData = [...prev];
              newData[index] = parseFloat(e.target.value);
              return newData;
            })
          }
        />
      ))}
      <button onClick={handleSubmit}>Detect</button>

      <AlertStatus status={status} />
      <AlertHistory history={history} />
    </div>
  );
}
