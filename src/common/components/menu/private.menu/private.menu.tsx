import { Link } from "react-router-dom";
import { MenuOptions } from "../../../../app/app";
import { LogoutBtn } from "../../../../features/user/components/logout/logout.btn";
import style from "./private.menu.style.module.scss";

type NavProps = {
  menuOptionsPrivate: MenuOptions[];
};

export const menuOptionsPrivate: MenuOptions[] = [
  { id: "1", label: "Galería", path: "/" },
  { id: "2", label: "Add", path: "/nuevo_bombardino" },
];

export function PrivateMenu({ menuOptionsPrivate }: NavProps) {
  return (
    <nav className={style.mainMenu}>
      <ul className={style.mainMenuList}>
        {menuOptionsPrivate.map((item) => (
          <li key={item.id}>
            <Link to={item.path} className={style.mainMenuListLink}>
              {item.label}
            </Link>
          </li>
        ))}
        <LogoutBtn></LogoutBtn>
      </ul>
    </nav>
  );
}
