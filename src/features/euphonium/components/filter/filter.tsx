/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";

import style from "./filter.style.module.scss";
import { useFilter } from "../../../../common/hooks/filter.hook/use.filter.hook";

export function GalleryFilter() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { clearEuphoniumsList } = useEuphonium(repo);

  const { restartPagination } = usePagination();
  const { clearFilter, loadFilter } = useFilter();

  const filterHandler = (value: string) => {
    clearEuphoniumsList();
    restartPagination();
    loadFilter(value);
  };

  const removeFilterHandler = () => {
    clearEuphoniumsList();
    clearFilter();
    restartPagination();
  };

  return (
    <>
      <ul className={style.mainMenuList}>
        <li>
          <button
            className={style.mainMenuListLink}
            onClick={() => {
              removeFilterHandler();
            }}
          >
            Todos
          </button>
        </li>
        <li>
          <button
            className={style.mainMenuListLink}
            onClick={() => {
              filterHandler("Plateado");
            }}
          >
            Plateado
          </button>
        </li>
        <li>
          <button
            className={style.mainMenuListLink}
            onClick={() => {
              filterHandler("Dorado");
            }}
          >
            Dorado
          </button>
        </li>
        <li>
          <button
            className={style.mainMenuListLink}
            onClick={() => {
              filterHandler("Otros");
            }}
          >
            Otros
          </button>
        </li>
      </ul>
    </>
  );
}
