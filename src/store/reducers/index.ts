import { combineReducers } from 'redux';
import { pokemonSlice, pokemonsSlice } from '../../services/middlewares';

const rootReducer = combineReducers({
  pokemons: pokemonsSlice.reducer,
  pokemon: pokemonSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
