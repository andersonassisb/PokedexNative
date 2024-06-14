import {combineReducers} from 'redux';
import {
  favoritePokemonsSlice,
  pokemonSlice,
  pokemonsSlice,
} from '../../services/middlewares';

const rootReducer = combineReducers({
  pokemon: pokemonSlice.reducer,
  pokemons: pokemonsSlice.reducer,
  favoritePokemons: favoritePokemonsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
