import axios from "axios";

async function downloadPokemons(pokemonListState, setPokemonListState, Default_URL,limit = 21) {
        const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : Default_URL); // Get the list of pokemons from the API
        
        // setPrevUrl(response.data.previous);
        // setNextUrl(response.data.next);

        // setPokemonListState((state)=>({ ...state, nextUrl: response.data.next, prevUrl: response.data.previous }))  
        
    let pokemonResults = response.data.results || response.data.pokemon || []; // Supports list and type endpoints
    pokemonResults = pokemonResults.slice(0, limit); // Limit the number of pokemons to download
    const pokemonPromise = pokemonResults.map(p => { 
        if (p.url) {
            return axios.get(p.url);
        }
        else if (p.pokemon && p.pokemon.url) {
            return axios.get(p.pokemon.url);
        }
        return null;
    }); // Array of promises for each pokemon details
        const pokemonListData = await axios.all(pokemonPromise.filter(Boolean)); // Wait for all pokemon details to be downloaded

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
        // setPokemonList(pokemonFinalList);
        
        // setPokemonListState({ ...pokemonListState, pokemonList: pokemonFinalList})
        setPokemonListState({ ...pokemonListState, pokemonList: pokemonFinalList, nextUrl: response.data.next, prevUrl: response.data.previous })
        // console.log(pokemonFinalList);
    }

export default downloadPokemons;
