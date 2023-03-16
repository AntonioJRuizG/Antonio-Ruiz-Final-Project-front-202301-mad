import { AppRouter } from "../app.router/app.router";
import "./app.css";

export type MenuOptions = {
  label: string;
  path: string;
};

export const menuOptions: MenuOptions[] = [
  { label: "Register", path: "/" },
  { label: "Login", path: "/about" },
];

export default function App() {
  return (
    <>
      <h1>Comunidad del bombardino</h1>
      <AppRouter menuOptions={menuOptions}></AppRouter>
    </>
  );
}
