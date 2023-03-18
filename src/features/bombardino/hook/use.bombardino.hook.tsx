import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import * as ac from "../reducer/bombardino.action.creator";
import { BombardinoRepo } from "../services/repository/bombardino.repo.js";

export function useBombardino(repo: BombardinoRepo) {
  const bombardinos = useSelector((state: RootState) => state.bombardinos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadBombardinos = async () => {
      try {
        const data = await repo.loadBombardinos();
        dispatch(ac.loadCreator(data.results));
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    loadBombardinos();
  }, [dispatch, repo]);

  return { bombardinos };
}
