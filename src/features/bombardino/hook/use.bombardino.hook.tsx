import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import * as ac from "../reducer/bombardino.action.creator";
import { BombardinoRepo } from "../services/repository/bombardino.repo.js";

export function useBombardino(repo: BombardinoRepo) {
  const bombardinos = useSelector((state: RootState) => state.bombardinos);
  const dispatch = useDispatch<AppDispatch>();

  const loadBombardinos = useCallback(async () => {
    try {
      const data = await repo.loadBombardinos();
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch, repo]);

  useEffect(() => {
    loadBombardinos();
  }, [loadBombardinos]);

  const loadOneBombardino = async (id: string) => {
    try {
      const data = await repo.getBombardino(id);
      dispatch(ac.loadCreator(data.results));
      return data.results;
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return { bombardinos, loadBombardinos, loadOneBombardino };
}
