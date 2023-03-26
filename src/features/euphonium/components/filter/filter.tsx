import { useMemo } from "react";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";

import style from "./filter.style.module.scss";

export function FilterMenu() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const {
    loadEuphoniumsPaginated,
    loadEuphoniumsFiltered,
    clearEuphoniumsList,
  } = useEuphonium(repo);

  const filterHandler = (filter: string) => {
    clearEuphoniumsList();
    loadEuphoniumsFiltered("2", filter);
  };

  const removeFilterHandler = () => {
    clearEuphoniumsList();
    loadEuphoniumsPaginated("2");
  };

  return (
    <>
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
    </>
  );
}
