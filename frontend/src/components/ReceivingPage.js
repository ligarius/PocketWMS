import React, { useState } from 'react';
import translations from '../translations';
import api from '../services/api';

function ReceivingPage({ products, locations, fetchProducts, selectedLanguage }) {
  const [newReceiving, setNewReceiving] = useState({ product_id: '', location_id: '', quantity: '', movement_type: '', error: '' });

  const createReceiving = async (e) => {
    e.preventDefault();
    if (!newReceiving.product_id || !newReceiving.location_id || newReceiving.quantity <= 0 || !newReceiving.movement_type) {
      setNewReceiving({ ...newReceiving, error: translations[selectedLanguage].fillAllFields });
      return;
    }
    try {
      await api.post('/receivings', newReceiving);
      setNewReceiving({ product_id: '', location_id: '', quantity: '', movement_type: '', error: '' });
      fetchProducts();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNewReceiving({ ...newReceiving, error: error.response.data.error });
      } else {
        console.error('Error creating receiving:', error);
      }
    }
  };

  return (
    <div>
      <h2>{translations[selectedLanguage].receiving}</h2>
      <form onSubmit={createReceiving}>
        <select
          value={newReceiving.product_id}
          onChange={(e) => setNewReceiving({ ...newReceiving, product_id: parseInt(e.target.value) })}
        >
          <option value="">{translations[selectedLanguage].selectProduct}</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <select
          value={newReceiving.location_id}
          onChange={(e) => setNewReceiving({ ...newReceiving, location_id: parseInt(e.target.value) })}
        >
          <option value="">{translations[selectedLanguage].selectLocation}</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder={translations[selectedLanguage].quantity}
          value={newReceiving.quantity}
          onChange={(e) => setNewReceiving({ ...newReceiving, quantity: parseInt(e.target.value) })}
          min="1"
        />
        <select
          value={newReceiving.movement_type}
          onChange={(e) => setNewReceiving({ ...newReceiving, movement_type: e.target.value })}
        >
          <option value="">{translations[selectedLanguage].selectMovementType}</option>
          <option value="purchase">{translations[selectedLanguage].purchaseReceiving}</option>
          <option value="production">{translations[selectedLanguage].productionReceiving}</option>
          <option value="return">{translations[selectedLanguage].returnReceiving}</option>
        </select>
        {newReceiving.error && <p style={{ color: 'red' }}>{newReceiving.error}</p>}
        <button type="submit">{translations[selectedLanguage].create}</button>
      </form>
    </div>
  );
}

export default ReceivingPage;