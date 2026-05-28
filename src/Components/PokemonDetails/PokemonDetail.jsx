// Css imports
import { Link, useParams } from 'react-router-dom';
import './PokemonDetails.css'
import usePokemonDetails from '../../hooks/usePokemonDetials';

function PokemonDetails() {

    const { id } = useParams();
    const [pokemon]=usePokemonDetails(id);
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
