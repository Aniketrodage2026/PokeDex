import './PokemonList.css';
import { useState,useEffect} from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const Default_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemonList, setPokemonList] = useState([]);
    const [pokedexUrl, setPokedexUrl] = useState(Default_URL);
    const [prevUrl,setPrevUrl]=useState(Default_URL);
    const [nextUrl,setNextUrl]=useState(Default_URL);

    async function downloadPokemons() {
        const response = await axios.get(pokedexUrl ? pokedexUrl : Default_URL); // Get the list of pokemons from the API
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);
        
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
    }, [pokedexUrl])
    
    return (
        <div className='pokemon-list-wrapper'>
            <div className='Pokemon-lsit-Heading'>Pokemon List</div>
            <div className='page-controls'>
                <button onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                <button onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
            </div>
            <div className='pokemon-List'>
                {pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} image={pokemon.image} />)}

            </div>
        </div>
    )
}

export default PokemonList;

