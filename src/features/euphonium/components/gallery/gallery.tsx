/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumProps } from "../../model/euphonium.model";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { useUsers } from "../../../user/hook/use.user.hook";
import { UserRepo } from "../../../user/services/repository/user.repo";

import style from "./gallery.style.module.scss";

export function Gallery() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const {
    euphoniums,
    loadEuphoniumsPaginated,
    loadEuphoniumsFiltered,
    clearEuphoniumsList,
    deleteEuphonium,
  } = useEuphonium(repo);

  const repoUser = useMemo(() => new UserRepo(), []);
  const { users } = useUsers(repoUser);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState({ value: "", filtered: false });
  const [visibleItems, setVisibleItems] = useState<number>(2);

  const showMoreHandler = () => {
    /* Temp.
    if (filter.filtered) {
      loadEuphoniumsFiltered((visibleItems + 1).toString(), filter.value);
    } else {
      loadEuphoniumsPaginated((visibleItems + 1).toString());
    } */
    loadEuphoniumsPaginated((visibleItems + 1).toString());
    setVisibleItems((visibleItems) => visibleItems + 1);
  };

  const filterHandler = useCallback(
    (value: string) => {
      setVisibleItems(1);
      setFilter({ value, filtered: true });
      clearEuphoniumsList();
      loadEuphoniumsFiltered("1", value);
    },
    [setVisibleItems]
  );

  const removeFilterHandler = useCallback(() => {
    setVisibleItems(1);
    setFilter({ value: "", filtered: false });
    clearEuphoniumsList();
    loadEuphoniumsPaginated("1");
  }, []);

  return (
    <>
      <h1 className={style.gallery_title}>Galería</h1>
      <nav className={style.mainNavbar}>
        <ul className={style.mainNavbar__list}>
          <li>Filter:</li>
          <li>
            <button
              className={style.mainNavbar__list__link}
              onClick={() => {
                removeFilterHandler();
              }}
            >
              ✖
            </button>
          </li>
          <li>
            <button
              className={style.mainNavbar__list__link}
              onClick={() => {
                filterHandler("Principiante");
              }}
            >
              Principiante
            </button>
          </li>
          <li>
            <button
              className={style.mainNavbar__list__link}
              onClick={() => {
                filterHandler("Intermedio");
              }}
            >
              Intermedio
            </button>
          </li>
          <li>
            <button
              className={style.mainNavbar__list__link}
              onClick={() => {
                filterHandler("Profesional");
              }}
            >
              Profesional
            </button>
          </li>
        </ul>
      </nav>
      <section className={style.gallery}>
        <ul className={style.gallery_list}>
          {euphoniums.map((item: EuphoniumProps) => (
            <li key={item.id} className={style.gallery_list_item}>
              <div>
                <p className={style.gallery_list_item_buttons}>
                  {users.user?.id === item.creator?.id && (
                    <>
                      <button className={style.card_button}>
                        <Link to={`/editar/${item.id}`} relative="path">
                          🖊
                        </Link>
                      </button>

                      <button
                        className={style.card_button}
                        onClick={() => {
                          deleteEuphonium(item.id, users.token);
                        }}
                      >
                        ✖
                      </button>
                    </>
                  )}
                </p>
              </div>
              <Link to={`/detalles/${item.id}`} relative="path">
                <div className={style.gallery_img_box}>
                  <div className={style.gallery_list_item_img}>
                    <img src={item.image} alt={item.alias} />
                  </div>
                </div>
                <div className={style.gallery_list_item_info}>
                  <ul>
                    <li>
                      <p className={style.gallery_list_item_info_alias}>
                        <span>Alias:</span> {item.alias}
                      </p>
                    </li>
                    <li>
                      <p className={style.gallery_list_item_info_creator}>
                        <span>Miembro:</span> {item.creator?.name}
                      </p>
                    </li>
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={style.showMoreBtn}
          onClick={() => {
            showMoreHandler();
          }}
        >
          Show more
        </button>
      </section>
    </>
  );
}
