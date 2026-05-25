
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Pokedex from './Components/Pokedex/Pokedex';
import PokemonDetails from './Components/PokemonDetails/PokemonDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Pokedex />} />
      <Route path='/pokemon/:id' element={<PokemonDetails />} />
      <Route path='*' element={<h1>404 Page Not Found</h1>} />
    </Routes>
  )
}

export default App;
