import { Link } from "react-router-dom";
import { MenuOptions } from "../../../app/app";
import { Menu } from "../menu/menu";
import style from "./header.style.module.scss";
import SearchIcon from "../../icons/search.icon";

export const menuOptionsPublic: MenuOptions[] = [
  { id: "1", label: "Login", path: "/iniciar_sesion" },
  { id: "2", label: "Register free", path: "/registro" },
];

export function Header() {
  return (
    <header className={style.header}>
      <div>
        <Menu></Menu>
      </div>
      <div className={style.headerTitleContainer}>
        <h1 className={style.headerTitle}>22NDNOV</h1>
        <div className={style.headerButtonsContainer}>
          <div className={style.headerSearchBoxContainer}>
            <input
              className={style.headerSearchBox}
              type="text"
              placeholder="Start searching ..."
            />
            <button className={style.headerSearchBtn}>
              <SearchIcon></SearchIcon>
            </button>
          </div>
          <div className={style.headerButtons}>
            {menuOptionsPublic.map((menuOpt) => (
              <Link key={menuOpt.id} to={menuOpt.path}>
                {menuOpt.label}
              </Link>
            ))}
          </div>
        </div>
        {/* <CurrentUserName></CurrentUserName> */}
      </div>
    </header>
  );
}
