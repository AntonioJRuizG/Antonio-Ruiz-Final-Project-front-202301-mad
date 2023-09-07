import { useMemo } from "react";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { UserRepo } from "../../../features/user/services/repository/user.repo";
import { MenuList } from "../menu.list/menu.list";

import style from "./menu.style.module.scss";
import { LogoutBtn } from "../../../features/user/components/logout/logout.btn";
import { MenuOptions } from "../../../app/app";

export const menuOptionsPrivate: MenuOptions[] = [
  { id: "1", label: "Gallery", path: "/" },
  { id: "2", label: "Add", path: "/nuevo_bombardino" },
];

export const menuOptionsPublic: MenuOptions[] = [
  { id: "1", label: "Gallery", path: "/" },
  { id: "3", label: "Sign in", path: "/registro" },
  { id: "4", label: "Login", path: "/iniciar_sesion" },
];

export function Menu() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);
  return (
    <>
      <nav className={style.mainMenu}>
        <ul className={style.mainMenuList}>
          {user.token ? (
            <>
              <MenuList menuOptions={menuOptionsPrivate}></MenuList>
              <LogoutBtn></LogoutBtn>
            </>
          ) : (
            <MenuList menuOptions={menuOptionsPublic}></MenuList>
          )}
        </ul>
      </nav>
    </>
  );
}
