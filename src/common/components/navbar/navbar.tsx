import style from "./navbar.style.module.scss";
import { MenuOptions } from "../../../app/app";
import { Link } from "react-router-dom";

type NavProps = {
  menuOptions: MenuOptions[];
};
export function Navbar({ menuOptions }: NavProps) {
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
