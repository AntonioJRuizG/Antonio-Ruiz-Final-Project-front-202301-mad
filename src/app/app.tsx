import { Header } from "../components/header/header";
import { Menu } from "../components/menu/menu";
import { AppRouter } from "../routes/app.router";
import "./app.css";

export type MenuOptions = {
  id: string;
  label: string;
  path: string;
};

export const menuOptions: MenuOptions[] = [
  { id: "1", label: "Galería", path: "/" },
  { id: "2", label: "Add", path: "/nuevo_bombardino" },
  { id: "3", label: "Registro", path: "/registro" },
  { id: "4", label: "Iniciar sesión", path: "/iniciar_sesion" },
];

export default function App() {
  return (
    <>
      <Header>
        <Menu menuOptions={menuOptions}></Menu>
      </Header>
      <AppRouter menuOptions={menuOptions}></AppRouter>
    </>
  );
}
