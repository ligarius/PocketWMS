import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import translations from '../translations';

function LogPage({ selectedLanguage }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const response = await axios.get('/logs');
    setLogs(response.data);
  };

  return (
    <div>
      <h2>{translations[selectedLanguage].logs}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>{translations[selectedLanguage].timestamp}</th>
            <th>{translations[selectedLanguage].message}</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.timestamp}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">{translations[selectedLanguage].back}</Link>
    </div>
  );
}

export default LogPage;