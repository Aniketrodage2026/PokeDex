// Css imports
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'
import { useState,useEffect} from 'react';
import axios from 'axios';

function PokemonDetails() {

    const { id } = useParams();
    const POKEMON_DETAIL_URL = 'https://pokemonapi.co/api/v2/pokemon/'
    
    const [pokemon, setPokemon] = useState(null);

    async function downLoadPokemon() {
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
        downLoadPokemon();
    },[])
    return (
        <>
           pokemon && <div>
                {pokemon.name}
            </div>  
            <div>
                <image src={pokemon.image} alt={pokemon.name} />
        
            </div>
            <div>
                <h3>Height: {pokemon.height}</h3>
                <h3>Weight: {pokemon.weight}</h3>
            </div>

            <div>
                Type:{pokemon.types.map(type => <span key={t.type.name}>{t.type.name}</span>)}
            </div>
        </>
    )
}

export default PokemonDetails;
