import './PokemonList.css';
import { useEffect } from 'react';
import axios from 'axios';

function PokemonList() {
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
                image:pokemon.sprites.other.dream_world.front_default,
                types:pokemon.types
            }

        })
        console.log(pokemonFinalList);
    }

    useEffect(() => {
        downloadPokemons();
    }, [])
    
    return (
        <>
            
        </>
    )
}

export default PokemonList;

