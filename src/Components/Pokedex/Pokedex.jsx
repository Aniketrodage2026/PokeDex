import { useState } from 'react';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css';
import PokemonDetails from '../PokemonDetails/PokemonDetail';


function Pokedex() {

    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className='pokedexWrapper'>
            <h1>Pokedex</h1>
            <Search updateSearchTerm={setSearchTerm} />
            {searchTerm ? <PokemonDetails pokemonName={searchTerm} /> : <PokemonList />}
            
        </div>
    )
}

export default Pokedex;