// Css imports
import { Link } from 'react-router-dom';
import './PokemonDetails.css'
import usePokemonDetails from '../../hooks/usePokemonDetials';
import Pokemon from '../Pokemon/Pokemon';

function PokemonDetails(pokemonName) {

    
    const [pokemon, pokemonListState] = usePokemonDetails(pokemonName);
    return (
        <>
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
        
            <div className='similar-pokemons'>
                <h2>Similar  Pokemons</h2>
                <div className='pokemon-similar-boxes'>
                    {pokemonListState.pokemonList.length > 0 && 
                        pokemonListState.pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} image={pokemon.image} id={pokemon.id} />)}
                </div>
            </div>
        </>
            )
}

export default PokemonDetails;
