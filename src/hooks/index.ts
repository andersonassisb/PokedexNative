import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchAll,
  selectDataByName,
  selectAllPokemons,
  fetchPokemonByName,
  selectStatusByName,
} from "../services/middlewares";

export function useGetAllPokemons() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, offset } = useSelector((state: RootState) =>
    selectAllPokemons(state)
  );

  useEffect(() => {
    if (status === undefined || status === "fetching") {
      dispatch(fetchAll({ offset }));
    }
  }, [status, dispatch, offset]);

  const isUninitialized = status === undefined;
  const isLoading = status === "pending" || status === undefined;
  const isError = status === "rejected";
  const isSuccess = status === "fulfilled";

  return { data, isUninitialized, isLoading, isError, isSuccess };
}

export function useGetPokemonByNameQuery(name: string) {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) =>
    selectStatusByName(state, name)
  );

  const data = useSelector((state: RootState) => selectDataByName(state, name));

  useEffect(() => {
    if (status === undefined || status === "fetching") {
      console.log("fetching");
      dispatch(fetchPokemonByName(name));
    }
  }, [status, name, dispatch]);

  const isUninitialized = status === undefined;
  const isLoading = status === "pending" || status === undefined;
  const isError = status === "rejected";
  const isSuccess = status === "fulfilled";

  return { data, isUninitialized, isLoading, isError, isSuccess };
}
