import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search({ updateSearchTerm }) {
    const debounceUpdateSearchTerm = useDebounce((e)=> updateSearchTerm(e.target.value))
    return (
            <input
            id='search-pokemon'
            type="text"
            placeholder='Search Pokemon' 
            onChange={debounceUpdateSearchTerm}
            />
            
    )
}
export default Search;
