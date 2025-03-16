import React from 'react';
import './App.css';
import EmissionsModel from './EmissionsModel'; // Assurez-vous que ce fichier est bien créé (voir étape 3)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Modélisation des émissions de CO2</h1>
        <EmissionsModel /> {/* Ici, nous affichons notre composant EmissionsModel */}
      </header>
    </div>
  );
}

export default App;
