import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { EuphoniumStructure } from "../model/euphonium.model.js";
import * as ac from "../reducer/euphonium.action.creator";
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

  const loadOneBombardino = async (id: string) => {
    try {
      const data = await repo.getEuphonium(id);
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteEuphonium = async (id: EuphoniumStructure["id"]) => {
    try {
      const itemId: string = id;
      await repo.deleteEuphonium(itemId);
      dispatch(ac.deleteCreator(itemId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const addEuphonium = async (euphoniums: EuphoniumStructure) => {
    try {
      await repo.createEuphonium(euphoniums);
      dispatch(ac.addCreator(euphoniums));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateEuphonium = async (euphonium: EuphoniumStructure) => {
    try {
      await repo.updateEuphonium(euphonium);
      dispatch(ac.updateCreator(euphonium));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    euphoniums,
    loadEuphoniums,
    loadOneBombardino,
    deleteEuphonium,
    updateEuphonium,
    addEuphonium,
  };
}
