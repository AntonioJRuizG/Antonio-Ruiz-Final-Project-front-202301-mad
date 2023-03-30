import { CurrentUserName } from "../../../features/user/components/current.user/current.user";
import { Menu } from "../menu/menu";
import style from "./header.style.module.scss";
export function Header() {
  return (
    <header className={style.header}>
      <div>
        <h1 className={style.headerTitle}>Comunidad del bombardino</h1>
        <CurrentUserName></CurrentUserName>
      </div>
      <div>
        <Menu></Menu>
      </div>
    </header>
  );
}
