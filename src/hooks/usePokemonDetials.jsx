import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id) {
    const POKEMON_DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon/';    
    const [pokemon, setPokemon] = useState(null);

    async function downLoadPokemon(id) {
        const response = await axios.get(POKEMON_DETAIL_URL + id);
        const pokemon = response.data;

        setPokemon({
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            image:
                pokemon.sprites.other.dream_world.front_default ||
                pokemon.sprites.other['official-artwork'].front_default ||
                pokemon.sprites.front_default,
            types: pokemon.types
        })
    }
    useEffect(() => {
        downLoadPokemon(id);
    }, [])
    
    return [pokemon];

}

export default usePokemonDetails;