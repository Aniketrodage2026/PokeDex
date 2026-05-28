import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';

function PokemonList() {
    const [pokemonListState, setPokemonListState] = usePokemonList();
    return (
        <div className='pokemon-list-wrapper'>
            <div className='Pokemon-lsit-Heading'>Pokemon List</div>
            <div className='page-controls'>
                <button onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.prevUrl })}>Prev</button>
                <button onClick={()=>setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}>Next</button>
            </div>
            <div className='pokemon-List'>
                {pokemonListState.pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} image={pokemon.image} id={pokemon.id} />)}
            </div>
        </div>
    )
}

export default PokemonList;

