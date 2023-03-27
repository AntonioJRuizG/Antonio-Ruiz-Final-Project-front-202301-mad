import { Link } from "react-router-dom";
import { MenuOptions } from "../../../app/app";

import style from "./public.menu.style.module.scss";

type NavProps = {
  menuOptionsPublic: MenuOptions[];
};

export const menuOptionsPublic: MenuOptions[] = [
  { id: "1", label: "Galería", path: "/" },
  { id: "3", label: "Registro", path: "/registro" },
  { id: "4", label: "Iniciar sesión", path: "/iniciar_sesion" },
];

export function PublicMenu({ menuOptionsPublic }: NavProps) {
  return (
    <nav className={style.mainMenu}>
      <ul className={style.mainMenuList}>
        {menuOptionsPublic.map((item) => (
          <li key={item.id} className={style.mainMenuListLi}>
            <Link to={item.path} className={style.mainMenuListLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
