import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { RESULT_LIMIT } from '../constants';
import {
  IResult,
  Pokemon,
  RequestState,
  IOptionalConfig,
  PokemonPageResult,
} from './types';

const getPokemonData = async (name: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
}

export const fetchAll = createAsyncThunk<IResult[], IOptionalConfig>(
  'pokemon/fetchAll',
  async ({ limit = RESULT_LIMIT, offset }, { rejectWithValue }) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
    );
    const data = (await response.json()) as PokemonPageResult;
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    const { results } = data;
    const pokemons = await Promise.all(results.map(async r => {
      const response = await getPokemonData(r.name);
      const data = (await response.json()) as Pokemon;
      return {
        ...r,
        data: {
          id: data.id,
          front_default:
            data.sprites.front_default,
          types: data.types
        }
      };
    }));
    return pokemons;
  },
);

export const fetchPokemonByName = createAsyncThunk<Pokemon, string>(
  'pokemon/fetchByName',
  async (name, { rejectWithValue }) => {
    const response = await getPokemonData(name);
    const data = (await response.json()) as Pokemon;
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);

// Thunks and action creators

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    offset: 0,
    data: [] as IResult[],
    status: 'idle' as RequestState,
  },
  reducers: {
    incrementOffset(state) {
      state.status = 'fetching';
      state.offset += RESULT_LIMIT;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAll.pending, state => {
      state.status = 'pending';
    });
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(fetchAll.rejected, state => {
      state.status = 'rejected';
    });
  },
});

export const { incrementOffset } = pokemonsSlice.actions;

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    dataByName: {} as Record<string, Pokemon | undefined>,
    statusByName: {} as Record<string, RequestState | undefined>,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPokemonByName.pending, (state, action) => {
      state.statusByName[action.meta.arg] = 'pending';
    });
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      state.statusByName[action.meta.arg] = 'fulfilled';
      state.dataByName[action.meta.arg] = action.payload;
    });
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.statusByName[action.meta.arg] = 'rejected';
    });
  },
});

// selectors

export const selectAllPokemons = (state: RootState) => state.pokemons;
export const selectStatusByName = (state: RootState, name: string) =>
  state.pokemon.statusByName[name];
export const selectDataByName = (state: RootState, name: string) =>
  state.pokemon.dataByName[name];
