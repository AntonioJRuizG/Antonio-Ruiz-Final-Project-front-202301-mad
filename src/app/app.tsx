import { Header } from "../components/header/header";
import { Navbar } from "../components/navbar/navbar";
import { AppRouter } from "../routes/app.router";
import "./app.css";

export type MenuOptions = {
  id: string;
  label: string;
  path: string;
};

export const menuOptions: MenuOptions[] = [
  { id: "1", label: "Galería", path: "/" },
  { id: "2", label: "Add", path: "/añadir_bombardino" },
  { id: "3", label: "Registro", path: "/registro" },
  { id: "4", label: "Iniciar sesión", path: "/iniciar_sesion" },
];

export default function App() {
  return (
    <>
      <Header>
        <Navbar menuOptions={menuOptions}></Navbar>
      </Header>
      <AppRouter menuOptions={menuOptions}></AppRouter>
    </>
  );
}
