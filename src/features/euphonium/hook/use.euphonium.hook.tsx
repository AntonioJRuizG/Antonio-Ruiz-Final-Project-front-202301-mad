import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { EuphoniumProps } from "../model/euphonium.model.js";
import * as ac from "../reducer/euphonium.action.creator";
import { newImage } from "../services/firebase/firebase-user";
import { EuphoniumRepo } from "../services/repository/euphonium.repo.js";

export function useEuphonium(repo: EuphoniumRepo) {
  const euphoniums = useSelector((state: RootState) => state.euphoniums);
  const dispatch = useDispatch<AppDispatch>();
  const loadEuphoniums = useCallback(async () => {
    try {
      const data = await repo.loadEuphoniums();
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch, repo]);

  useEffect(() => {
    loadEuphoniums();
  }, [loadEuphoniums]);

  const loadOneEuphonium = async (id: string) => {
    try {
      const data = await repo.getEuphonium(id);
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteEuphonium = async (id: EuphoniumProps["id"], token: string) => {
    try {
      const itemId: string = id;
      await repo.deleteEuphonium(itemId, token);
      dispatch(ac.deleteCreator(itemId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const clearEuphoniumsList = async () => {
    dispatch(ac.clearCreator([]));
  };

  const addEuphonium = async (
    euphonium: EuphoniumProps,
    token: string,
    file: File
  ) => {
    try {
      file && (await newImage(euphonium, file));
      await repo.createEuphonium(euphonium, token);
      dispatch(ac.addCreator(euphonium));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateEuphonium = async (
    euphonium: EuphoniumProps,
    token: string,
    file: File
  ) => {
    try {
      await newImage(euphonium, file);
      await repo.updateEuphonium(euphonium, token);
      dispatch(ac.updateCreator(euphonium));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loadEuphoniumsPaginated = async (offset: string) => {
    try {
      const data = await repo.loadEuphoniumsPaginated(offset);
      dispatch(ac.addListCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loadEuphoniumsFiltered = async (offset: string, material: string) => {
    try {
      const data = await repo.loadEuphoniumsFiltered(offset, material);
      dispatch(ac.addListCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    euphoniums,
    loadEuphoniums,
    loadOneEuphonium,
    loadEuphoniumsPaginated,
    loadEuphoniumsFiltered,
    deleteEuphonium,
    clearEuphoniumsList,
    updateEuphonium,
    addEuphonium,
  };
}
