import axios from "axios";
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";

function usePokemonDetails(id) {
    const POKEMON_DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon/';    
    const [pokemon, setPokemon] = useState(null);
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: null,
        prevUrl: null,
        nextUrl: null
    });

    async function downLoadGivenPokemon(id) {
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
        });
        const types = pokemon.types.map(type => type.type.name);
        return types[0];
    }

    async function downloadPokemonAndRelated(id) {
        const type = await downLoadGivenPokemon(id);
        await downloadPokemons(
            { ...pokemonListState, pokedexUrl: `https://pokeapi.co/api/v2/type/${type}` },
            setPokemonListState,
            POKEMON_DETAIL_URL
        );
    }
    useEffect(() => {
        downloadPokemonAndRelated(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id])
    
    return [pokemon,pokemonListState];

}

export default usePokemonDetails;
