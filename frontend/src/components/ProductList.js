import React from 'react';
import translations from '../translations';

function ProductList({ products, locations, onEditProduct, selectedLanguage }) {
  const getLocationName = (locationId) => {
    const location = locations.find((location) => location.id === locationId);
    return location ? location.name : '';
  };

  return (
    <div>
      <h2>{translations[selectedLanguage].products}</h2>
      <table>
        <thead>
          <tr>
            <th>{translations[selectedLanguage].id}</th>
            <th>{translations[selectedLanguage].name}</th>
            <th>{translations[selectedLanguage].quantity}</th>
            <th>{translations[selectedLanguage].location}</th>
            <th>{translations[selectedLanguage].actions}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{getLocationName(product.location_id)}</td>
              <td>
                <button onClick={() => onEditProduct(product)}>{translations[selectedLanguage].edit}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;