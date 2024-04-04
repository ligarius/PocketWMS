import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import LocationList from './components/LocationList';
import LogPage from './components/LogPage';
import MasterDataPage from './components/MasterDataPage';
import ReceivingPage from './components/ReceivingPage';
import ReportingPage from './components/ReportingPage';
import api from './services/api';
import translations from './translations';

function App() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    fetchProducts();
    fetchLocations();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  const fetchLocations = async () => {
    const response = await api.get('/locations');
    setLocations(response.data);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {/* Verifica que los nombres de las rutas coincidan exactamente con los definidos en el componente Routes */}
            <li>
              <Link to="/">{translations[selectedLanguage].home}</Link>
            </li>
            <li>
              <Link to="/master-data">{translations[selectedLanguage].masterData}</Link>
            </li>
            <li>
              <Link to="/receiving">{translations[selectedLanguage].receiving}</Link>
            </li>
            <li>
              <Link to="/reporting">{translations[selectedLanguage].reporting}</Link>
            </li>
            <li>
              <Link to="/logs">{translations[selectedLanguage].logs}</Link>
            </li>
            <li>
              <Link to="/settings">{translations[selectedLanguage].settings}</Link>
            </li>
          </ul>
        </nav>

        {/* Asegúrate de que los nombres de las rutas aquí coincidan con los utilizados en los enlaces del menú */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>PocketWMS</h1>
                <ProductList
                  products={products}
                  locations={locations}
                  selectedLanguage={selectedLanguage}
                />
                <LocationList
                  locations={locations}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            }
          />

          <Route
            path="/master-data"
            element={
              <MasterDataPage
                products={products}
                locations={locations}
                fetchProducts={fetchProducts}
                fetchLocations={fetchLocations}
                selectedLanguage={selectedLanguage}
              />
            }
          />

          <Route
            path="/receiving"
            element={
              <ReceivingPage
                products={products}
                locations={locations}
                fetchProducts={fetchProducts}
                selectedLanguage={selectedLanguage}
              />
            }
          />

          <Route
            path="/reporting"
            element={
              <ReportingPage
                products={products}
                locations={locations}
                selectedLanguage={selectedLanguage}
              />
            }
          />

          <Route
            path="/logs"
            element={<LogPage selectedLanguage={selectedLanguage} />}
          />

          <Route
            path="/settings"
            element={
              <div>
                <h2>{translations[selectedLanguage].settings}</h2>
                <div>
                  <label>{translations[selectedLanguage].language}: </label>
                  <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <Link to="/">{translations[selectedLanguage].back}</Link>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;