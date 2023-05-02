import { useDispatch, useSelector } from "react-redux";
import * as ac from "../../reducer/filter.reducer/filter.action.creator";
import { AppDispatch, RootState } from "../../../store/store";

export function useFilter() {
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  const loadFilter = () => {
    const currentFilter = filter.filter;
    const newFilter = {
      filter: currentFilter,
    };
    dispatch(ac.loadCreator(newFilter));
  };

  const clearFilter = () => {
    dispatch(ac.clearCreator());
  };

  return { filter, loadFilter, clearFilter };
}
