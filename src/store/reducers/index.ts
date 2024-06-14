import {combineReducers} from 'redux';
import {
  favoritePokemonsSlice,
  pokemonSlice,
  pokemonsSlice,
} from '../../services/middlewares';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favoritesPersistConfig = {
  key: 'favoritePokemons',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

export const favoritePokemonsReducer = persistReducer(
  favoritesPersistConfig,
  favoritePokemonsSlice.reducer,
);

const rootReducer = combineReducers({
  pokemon: pokemonSlice.reducer,
  pokemons: pokemonsSlice.reducer,
  favoritePokemons: favoritePokemonsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
