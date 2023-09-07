import { Link } from "react-router-dom";
import { MenuOptions } from "../../../app/app";
import { Menu } from "../menu/menu";
import style from "./header.style.module.scss";
import SearchIcon from "../../icons/search.icon";
import { UserRepo } from "../../../features/user/services/repository/user.repo";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { useMemo } from "react";

export const menuOptionsPublic: MenuOptions[] = [
  { id: "1", label: "Login", path: "/iniciar_sesion" },
  { id: "2", label: "Register free", path: "/registro" },
];

export const menuOptionsLogged: MenuOptions[] = [
  { id: "1", label: "Dashboard", path: "/user_dashboard" },
];

export function Header() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

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
            {user?.user
              ? menuOptionsLogged.map((menuOpt) => (
                  <Link key={menuOpt.id} to={menuOpt.path}>
                    {menuOpt.label}
                  </Link>
                ))
              : menuOptionsPublic.map((menuOpt) => (
                  <Link key={menuOpt.id} to={menuOpt.path}>
                    {menuOpt.label}
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </header>
  );
}
