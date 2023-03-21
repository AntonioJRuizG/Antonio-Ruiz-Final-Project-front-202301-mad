import { BrowserRouter } from "react-router-dom";
import { Header } from "../common/components/header/header";
import { Navbar } from "../common/components/navbar/navbar";
import { AppRouter } from "../router/app.router/app.router";
import "./app.css";

export type MenuOptions = {
  label: string;
  path: string;
};

export const menuOptions: MenuOptions[] = [
  { label: "Galería", path: "/" },
  { label: "Add", path: "/añadir_bombardino" },
  { label: "Registro", path: "/registro" },
  { label: "Iniciar sesión", path: "/iniciar_sesion" },
];

export default function App() {
  return (
    <>
      <Header>
        <Navbar menuOptions={menuOptions}></Navbar>
      </Header>
      <BrowserRouter>
        <AppRouter menuOptions={menuOptions}></AppRouter>
      </BrowserRouter>
    </>
  );
}
