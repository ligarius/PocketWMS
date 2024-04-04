import React, { useState } from 'react';
import translations from '../translations';
import api from '../services/api';

function ReportingPage({ products, locations, selectedLanguage }) {
  const [filters, setFilters] = useState({ product_id: '', location_id: '', start_date: '', end_date: '', movement_type: '' });
  const [report, setReport] = useState([]);

  const generateReport = async () => {
    try {
      const response = await api.get('/reports', { params: filters });
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div>
      <h2>{translations[selectedLanguage].reporting}</h2>
      <div>
        <label>{translations[selectedLanguage].product}: </label>
        <select
          value={filters.product_id}
          onChange={(e) => setFilters({ ...filters, product_id: e.target.value })}
        >
          <option value="">{translations[selectedLanguage].all}</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>{translations[selectedLanguage].location}: </label>
        <select
          value={filters.location_id}
          onChange={(e) => setFilters({ ...filters, location_id: e.target.value })}
        >
          <option value="">{translations[selectedLanguage].all}</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>{translations[selectedLanguage].startDate}: </label>
        <input
          type="date"
          value={filters.start_date}
          onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
        />
      </div>
      <div>
        <label>{translations[selectedLanguage].endDate}: </label>
        <input
          type="date"
          value={filters.end_date}
          onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
        />
      </div>
      <div>
        <label>{translations[selectedLanguage].movementType}: </label>
        <select
          value={filters.movement_type}
          onChange={(e) => setFilters({ ...filters, movement_type: e.target.value })}
        >
          <option value="">{translations[selectedLanguage].all}</option>
          <option value="purchase">{translations[selectedLanguage].purchaseReceiving}</option>
          <option value="production">{translations[selectedLanguage].productionReceiving}</option>
          <option value="return">{translations[selectedLanguage].returnReceiving}</option>
        </select>
      </div>
      <button onClick={generateReport}>{translations[selectedLanguage].generateReport}</button>

      <table>
        <thead>
          <tr>
            <th>{translations[selectedLanguage].date}</th>
            <th>{translations[selectedLanguage].product}</th>
            <th>{translations[selectedLanguage].location}</th>
            <th>{translations[selectedLanguage].quantity}</th>
            <th>{translations[selectedLanguage].movementType}</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.product_name}</td>
              <td>{item.location_name}</td>
              <td>{item.quantity}</td>
              <td>{translations[selectedLanguage][item.movement_type]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportingPage;