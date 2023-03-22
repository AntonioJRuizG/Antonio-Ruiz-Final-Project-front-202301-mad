import style from "./header.style.module.scss";
type HeaderProps = { children: JSX.Element };
export function Header({ children }: HeaderProps) {
  return (
    <header className={style.header}>
      <div>
        <h1 className={style.headerTitle}>Comunidad del bombardino</h1>
      </div>
      <div>{children}</div>
    </header>
  );
}
