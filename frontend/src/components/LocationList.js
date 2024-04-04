import React from 'react';
import translations from '../translations';

function LocationList({ locations, onEditLocation, selectedLanguage }) {
  return (
    <div>
      <h2>{translations[selectedLanguage].locations}</h2>
      <table>
        <thead>
          <tr>
            <th>{translations[selectedLanguage].id}</th>
            <th>{translations[selectedLanguage].name}</th>
            <th>{translations[selectedLanguage].capacity}</th>
            <th>{translations[selectedLanguage].actions}</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>{location.capacity}</td>
              <td>
                <button onClick={() => onEditLocation(location)}>{translations[selectedLanguage].edit}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationList;