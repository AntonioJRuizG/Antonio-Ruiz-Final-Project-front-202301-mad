import { Menu } from "../menu/menu";
import style from "./header.style.module.scss";
export function Header() {
  return (
    <header className={style.header}>
      <div>
        <h1 className={style.headerTitle}>Comunidad del bombardino</h1>
      </div>
      <div>
        <Menu></Menu>
      </div>
    </header>
  );
}
