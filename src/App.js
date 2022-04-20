import React from 'react';
import './App.css';
import Joke from "./components/joke";
import Personaje from './components/personajes';

function App() {
  return (
    <div className="App">
      <h1>Aplicacion de prueba</h1>
      <Joke/>
      <Personaje/>
    </div>
  );
}

export default App;
