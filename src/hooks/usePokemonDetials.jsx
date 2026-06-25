import axios from "axios";
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";
import { useParams } from "react-router-dom";

function usePokemonDetails({pokemonName}) {
    const { id } = useParams();
    const POKEMON_DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon/';    
    const [pokemon, setPokemon] = useState(null);
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: null,
        prevUrl: null,
        nextUrl: null
    });

    async function downLoadGivenPokemon(id) {
        const pokemonIdentifier = pokemonName || id;
        const response = await axios.get(POKEMON_DETAIL_URL + pokemonIdentifier);
        const pokemonData = response.data;

        setPokemon({
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            image:
                pokemonData.sprites.other.dream_world.front_default ||
                pokemonData.sprites.other['official-artwork'].front_default ||
                pokemonData.sprites.front_default,
            types: pokemonData.types
        });
        const types = pokemonData.types.map(type => type.type.name);
        return types[0];
    }

    async function downloadPokemonAndRelated(id) {
        try {
          const type = await downLoadGivenPokemon(id);
        await downloadPokemons(
            { ...pokemonListState, pokedexUrl: `https://pokeapi.co/api/v2/type/${type}` },
            setPokemonListState,
            POKEMON_DETAIL_URL
        );  
        }
        catch (error) {
            console.error('Error downloading pokemon and related:', error);
        }
        
    }
    useEffect(() => {
        downloadPokemonAndRelated(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, pokemonName]);
    
    return [pokemon,pokemonListState];

}

export default usePokemonDetails;
