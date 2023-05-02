/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumProps } from "../../model/euphonium.model";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { useUsers } from "../../../user/hook/use.user.hook";
import { UserRepo } from "../../../user/services/repository/user.repo";
import { LoadingSpin } from "../../../../common/components/loading/loading";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";

import style from "./gallery.style.module.scss";

export function Gallery() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums, clearEuphoniumsList, deleteEuphonium } =
    useEuphonium(repo);

  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  const { nextPage, restartPagination } = usePagination();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState({ value: "", filtered: false });

  const showMoreHandler = () => {
    nextPage();
  };

  const filterHandler = useCallback((value: string) => {
    restartPagination();
    setFilter({ value, filtered: true });
    clearEuphoniumsList();
  }, []);

  const removeFilterHandler = useCallback(() => {
    setFilter({ value: "", filtered: false });
    clearEuphoniumsList();
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
              <div>
                <p className={style.galleryListItemButtons}>
                  {user.user?.id === item.creator?.id && (
                    <>
                      <button className={style.cardButton}>
                        <Link to={`/editar/${item.id}`} relative="path">
                          🖊
                        </Link>
                      </button>

                      <button
                        className={style.cardButton}
                        onClick={() => {
                          deleteEuphonium(item.id, user.token);
                        }}
                      >
                        ✖
                      </button>
                    </>
                  )}
                </p>
              </div>
              <Link to={`/detalles/${item.id}`} relative="path">
                <div className={style.galleryImgBox}>
                  <div className={style.galleryListItemImg}>
                    <img height={160} src={item.image} alt={item.alias} />
                  </div>
                </div>
                <div className={style.galleryListItemInfo}>
                  <ul>
                    <li>
                      <p className={style.galleryListItemInfoAlias}>
                        <span>Alias:</span> {item.alias}
                      </p>
                    </li>
                    <li>
                      <p className={style.galleryListItemInfoCreator}>
                        <span>Miembro:</span> {item.creator?.name}
                      </p>
                    </li>
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {euphoniums !== undefined && (
          <button
            className={style.showMoreBtn}
            onClick={() => {
              showMoreHandler();
            }}
          >
            Show more
          </button>
        )}
      </section>
    </>
  );
}
