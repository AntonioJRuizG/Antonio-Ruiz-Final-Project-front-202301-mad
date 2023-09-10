import { Link } from "react-router-dom";
import { MenuOptions } from "../../../app/app";

import style from "./menu.list.style.module.scss";
import { useState } from "react";

export type NavProps = {
  menuOptions: MenuOptions[];
};

export function MenuList({ menuOptions }: NavProps) {
  const [activeLink, setActiveLink] = useState("/");

  const handleSetActiveLink = (path: string) => {
    setActiveLink(path);
  };

  return (
    <>
      {menuOptions.map((item) => (
        <li key={item.id}>
          <Link
            to={item.path}
            className={
              style.mainMenuListLink +
              " " +
              (item.path === activeLink ? style["activeLink"] : "")
            }
            onClick={() => handleSetActiveLink(item.path)}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}
