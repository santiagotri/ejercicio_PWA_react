import React from 'react';
import './App.css';
import Joke from "./components/joke";
import Personaje from './components/personajes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1 className='text-danger'>MARVEL</h1>
      <Personaje/>
    </div>
  );
}

export default App;
