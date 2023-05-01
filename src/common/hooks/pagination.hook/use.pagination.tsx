import { useDispatch, useSelector } from "react-redux";
import { PaginationProps } from "../../reducer/page.reducer/page.reducer";
import * as ac from "../../reducer/page.reducer/page.action.creator";
import { AppDispatch, RootState } from "../../../store/store";

export function usePagination(pageProps: PaginationProps) {
  const page = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch<AppDispatch>();

  const nextPage = async () => {
    pageProps.currentPage = pageProps.currentPage + 1;
    dispatch(ac.loadCreator(pageProps));
  };

  return { page, nextPage };
}
