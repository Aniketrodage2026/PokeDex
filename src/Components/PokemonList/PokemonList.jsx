import './PokemonList.css';
import { useState,useEffect} from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const POKIMON_URL = 'https://pokeapi.co/api/v2/pokemon/';

    async function downloadPokemons() {
        const response = await axios.get(POKIMON_URL); 
        
        const pokemonResults = response.data.results; // Array of pokemon objects with name and url    
        const pokemonPromise = pokemonResults.map(pokemon => axios.get(pokemon.url)); // Array of promises for each pokemon details
        const pokemonListData = await axios.all(pokemonPromise); // Wait for all pokemon details to be downloaded

        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data; // Get the pokemon details from the response
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:
                    pokemon.sprites.other.dream_world.front_default ||
                    pokemon.sprites.other['official-artwork'].front_default ||
                    pokemon.sprites.front_default,
                types:pokemon.types
            }

        })
        setPokemonList(pokemonFinalList);
        // console.log(pokemonFinalList);
    }

    useEffect(() => {
        downloadPokemons();
    }, [])
    
    return (
        <div className='pokemon-list-wrapper'>
            <div>Pokemon List</div>
            {pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} image={pokemon.image} />)}
        </div>
    )
}

export default PokemonList;

