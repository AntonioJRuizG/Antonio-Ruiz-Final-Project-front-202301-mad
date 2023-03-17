type HeaderProps = { children: JSX.Element };
export function Header({ children }: HeaderProps) {
  return (
    <header className="app-header">
      <h1>Comunidad del bombardino</h1>
      <div>{children}</div>
    </header>
  );
}
