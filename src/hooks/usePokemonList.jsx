
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";

function usePokemonList(Default_URL) {
    
    // const [pokemonList, setPokemonList] = useState([]);
    // const [pokedexUrl, setPokedexUrl] = useState(Default_URL);
    // const [prevUrl,setPrevUrl]=useState(Default_URL);
    // const [nextUrl,setNextUrl]=useState(Default_URL);

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: Default_URL,
        prevUrl: Default_URL,
        nextUrl: Default_URL
    })

    
    
    useEffect(() => {
        downloadPokemons(pokemonListState, setPokemonListState, Default_URL);
    }, [pokemonListState.pokedexUrl])

    return [pokemonListState, setPokemonListState];
    
}

export default usePokemonList;
