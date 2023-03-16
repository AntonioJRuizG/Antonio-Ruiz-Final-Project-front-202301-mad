import { MenuOptions } from "../app/app";

type NavProps = {
  menuOptions: MenuOptions[];
};
export function Navbar({ menuOptions }: NavProps) {
  return (
    <nav>
      <ul className="main-navbar">
        {menuOptions.map((item) => (
          <a key={item.label} href={item.path}>
            <li
              className={`main-navbar__${item.label.toLocaleLowerCase()} main-navbar__item`}
            >
              {item.label}
            </li>
          </a>
        ))}
      </ul>
    </nav>
  );
}
