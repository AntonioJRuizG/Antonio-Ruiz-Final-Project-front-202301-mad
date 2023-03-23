import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { EuphoniumProps } from "../model/euphonium.model.js";
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

  const deleteEuphonium = async (id: EuphoniumProps["id"], token: string) => {
    try {
      const itemId: string = id;
      await repo.deleteEuphonium(itemId, token);
      dispatch(ac.deleteCreator(itemId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const addEuphonium = async (euphoniums: EuphoniumProps, token: string) => {
    try {
      await repo.createEuphonium(euphoniums, token);
      dispatch(ac.addCreator(euphoniums));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateEuphonium = async (euphonium: EuphoniumProps, token: string) => {
    try {
      await repo.updateEuphonium(euphonium, token);
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
