import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "../app.router/app.router";
import { Navbar } from "../navbar/navbar";
import "./app.css";

export type MenuOptions = {
  label: string;
  path: string;
};

export const menuOptions: MenuOptions[] = [
  { label: "Register", path: "/" },
  { label: "Login", path: "/login" },
];

export default function App() {
  return (
    <>
      <h1>Comunidad del bombardino</h1>
      <Navbar menuOptions={menuOptions}></Navbar>
      <BrowserRouter>
        <AppRouter menuOptions={menuOptions}></AppRouter>
      </BrowserRouter>
    </>
  );
}
