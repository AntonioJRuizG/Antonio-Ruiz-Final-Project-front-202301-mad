import style from "./menu.style.module.scss";
import { Link } from "react-router-dom";
import { MenuOptions } from "../../app/app";

type NavProps = {
  menuOptions: MenuOptions[];
};

export const menuOptions: MenuOptions[] = [
  { id: "1", label: "Galería", path: "/" },
  { id: "2", label: "Add", path: "/nuevo_bombardino" },
  { id: "3", label: "Registro", path: "/registro" },
  { id: "4", label: "Iniciar sesión", path: "/iniciar_sesion" },
];

export function Menu({ menuOptions }: NavProps) {
  return (
    <nav className={style.mainNavbar}>
      <ul className={style.mainNavbar__list}>
        {menuOptions.map((item) => (
          <li key={item.id}>
            <Link to={item.path} className={style.mainNavbar__list__link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
