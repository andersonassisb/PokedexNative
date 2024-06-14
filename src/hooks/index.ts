import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {
  fetchAll,
  selectDataByName,
  selectAllPokemons,
  fetchPokemonByName,
  selectStatusByName,
} from '../services/middlewares';

export function useGetAllPokemons() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {data, status, offset} = useSelector((state: RootState) =>
    selectAllPokemons(state),
  );

  const loadPokemons = useCallback(() => {
    dispatch(fetchAll({offset}));
  }, [dispatch, offset]);

  useEffect(() => {
    if (!isReady || status === undefined) {
      loadPokemons();
      setIsReady(true);
    }
  }, [isReady, status, loadPokemons]);

  useEffect(() => {
    if (status === 'fetching') {
      setIsReady(false);
    }
  }, [status]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    loadPokemons,
    isUninitialized,
  };
}

export function useGetPokemonByNameQuery(name: string) {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) =>
    selectStatusByName(state, name),
  );

  const data = useSelector((state: RootState) => selectDataByName(state, name));

  useEffect(() => {
    if (status === undefined || status === 'fetching') {
      dispatch(fetchPokemonByName(name));
    }
  }, [status, name, dispatch]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return {data, isUninitialized, isLoading, isError, isSuccess};
}
