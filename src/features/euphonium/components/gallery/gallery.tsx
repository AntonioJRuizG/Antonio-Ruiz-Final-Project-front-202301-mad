/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from "react";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumProps } from "../../model/euphonium.model";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { LoadingSpin } from "../../../../common/components/loading/loading";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";

import style from "./gallery.style.module.scss";
import { useFilter } from "../../../../common/hooks/filter.hook/use.filter.hook";
import { Thumbnail } from "../thumbnail/thumbnail";
import { UserRepo } from "../../../user/services/repository/user.repo";
import { useUsers } from "../../../user/hook/use.user.hook";

export function Gallery() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums, clearEuphoniumsList, deleteEuphonium } =
    useEuphonium(repo);

  const { page, nextPage, prevPage, restartPagination } = usePagination();
  const { clearFilter, loadFilter } = useFilter();

  const showMoreHandler = () => {
    nextPage();
  };

  const showLessHandler = () => {
    prevPage();
  };

  const filterHandler = useCallback((value: string) => {
    clearEuphoniumsList();
    restartPagination();
    loadFilter(value);
  }, []);

  const removeFilterHandler = useCallback(() => {
    clearEuphoniumsList();
    clearFilter();
    restartPagination();
  }, []);

  if (!euphoniums.length) {
    return (
      <div className={style.spin}>
        <LoadingSpin></LoadingSpin>
      </div>
    );
  }

  return (
    <>
      <h1 className={style.galleryTitle}>Galería</h1>
      <nav className={style.mainMenu}>
        <ul className={style.mainMenuList}>
          <li>Filter:</li>
          <li>
            <button
              className={style.mainMenuListLink}
              onClick={() => {
                removeFilterHandler();
              }}
            >
              ✖ Clear
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
      </nav>
      <section className={style.gallery}>
        <ul className={style.galleryList}>
          {euphoniums.map((item: EuphoniumProps) => (
            <li key={item.id} className={style.galleryListItem}>
              <Thumbnail
                item={item}
                deleteEuphonium={deleteEuphonium}
                user={user}
              ></Thumbnail>
            </li>
          ))}
        </ul>
        <div className={style.btnContainer}>
          {euphoniums.length && page.currentPage > 1 && (
            <button className={style.showMoreBtn} onClick={showLessHandler}>
              Anterior
            </button>
          )}
          {euphoniums.length && page.currentPage < 10 && (
            <button className={style.showMoreBtn} onClick={showMoreHandler}>
              Siguiente
            </button>
          )}
        </div>
      </section>
    </>
  );
}
