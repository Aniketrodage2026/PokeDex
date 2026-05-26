// Css imports
import { Link, useParams } from 'react-router-dom';
import './PokemonDetails.css'
import { useState,useEffect} from 'react';
import axios from 'axios';

function PokemonDetails() {

    const { id } = useParams();
    const POKEMON_DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon/';    
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
        <div className='pokemon-details-page'>
            <h1 className='pokemon-page-heading'>
                <Link to="/" className='pokemon-list-link'>
                    Pokemon List
                 </Link>
            </h1>
            {pokemon && <div className='pokemon-details-wrapper'>
                <div className='pokemon-detail-name'>
                    {pokemon.name}
                </div>

                <div className='pokemon-detail-image'>
                    <img src={pokemon.image} alt={pokemon.name} />
        
                </div>

                <div className='pokemon-attributes'>
                    <h3>Height: {pokemon.height}</h3>
                    <h3>Weight: {pokemon.weight}</h3>
                </div>

                <div className='pokemon-types'>
                    <h3>Type:</h3>{pokemon.types.map((type) => <span className='type' key={type.type.name}> {type.type.name}</span>)}            </div>
            </div>
            }
     </div>    
            )
}

export default PokemonDetails;
