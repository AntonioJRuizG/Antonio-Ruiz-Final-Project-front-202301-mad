import style from "./navbar.style.module.scss";
import { MenuOptions } from "../../../app/app";

type NavProps = {
  menuOptions: MenuOptions[];
};
export function Navbar({ menuOptions }: NavProps) {
  return (
    <nav className={style.mainNavbar}>
      <ul className={style.mainNavbar__list}>
        {menuOptions.map((item) => (
          <li>
            <a
              className={style.mainNavbar__list__link}
              key={item.label}
              href={item.path}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
