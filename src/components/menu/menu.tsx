import style from "./menu.style.module.scss";
import { Link } from "react-router-dom";
import { MenuOptions } from "../../app/app";

type NavProps = {
  menuOptions: MenuOptions[];
};

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