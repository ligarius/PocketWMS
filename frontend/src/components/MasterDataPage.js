import React, { useState } from 'react';
import translations from '../translations';
import api from '../services/api';

function MasterDataPage({ products, locations, fetchProducts, fetchLocations, selectedLanguage }) {
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', location_id: '', error: '' });
  const [newLocation, setNewLocation] = useState({ name: '', capacity: '', error: '' });

  const createProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.quantity <= 0 || !newProduct.location_id) {
      setNewProduct({ ...newProduct, error: translations[selectedLanguage].fillAllFields });
      return;
    }
    try {
      await api.post('/products', newProduct);
      setNewProduct({ name: '', quantity: '', location_id: '', error: '' });
      fetchProducts();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNewProduct({ ...newProduct, error: error.response.data.error });
      } else {
        console.error('Error creating product:', error);
      }
    }
  };

  const createLocation = async (e) => {
    e.preventDefault();
    if (!newLocation.name || newLocation.capacity <= 0) {
      setNewLocation({ ...newLocation, error: translations[selectedLanguage].enterLocationNameAndCapacity });
      return;
    }
    try {
      await api.post('/locations', newLocation);
      setNewLocation({ name: '', capacity: '', error: '' });
      fetchLocations();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNewLocation({ ...newLocation, error: error.response.data.error });
      } else {
        console.error('Error creating location:', error);
      }
    }
  };

  return (
    <div>
      <h2>{translations[selectedLanguage].masterData}</h2>

      <h3>{translations[selectedLanguage].createProduct}</h3>
      <form onSubmit={createProduct}>
        <input
          type="text"
          placeholder={translations[selectedLanguage].productName}
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder={translations[selectedLanguage].quantity}
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          min="1"
        />
        <select
          value={newProduct.location_id}
          onChange={(e) => setNewProduct({ ...newProduct, location_id: parseInt(e.target.value) })}
        >
          <option value="">{translations[selectedLanguage].selectLocation}</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        {newProduct.error && <p style={{ color: 'red' }}>{newProduct.error}</p>}
        <button type="submit">{translations[selectedLanguage].create}</button>
      </form>

      <h3>{translations[selectedLanguage].createLocation}</h3>
      <form onSubmit={createLocation}>
        <input
          type="text"
          placeholder={translations[selectedLanguage].locationName}
          value={newLocation.name}
          onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
        />
        <input
          type="number"
          placeholder={translations[selectedLanguage].capacity}
          value={newLocation.capacity}
          onChange={(e) => setNewLocation({ ...newLocation, capacity: parseInt(e.target.value) })}
          min="1"
        />
        {newLocation.error && <p style={{ color: 'red' }}>{newLocation.error}</p>}
        <button type="submit">{translations[selectedLanguage].create}</button>
      </form>
    </div>
  );
}

export default MasterDataPage;