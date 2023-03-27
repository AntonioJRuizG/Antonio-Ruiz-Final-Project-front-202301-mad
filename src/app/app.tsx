import { Header } from "../components/header/header";
import { menuOptions } from "../components/menu/menu";
import { AppRouter } from "../routes/app.router";
import "./app.css";

export type MenuOptions = {
  id: string;
  label: string;
  path: string;
};

export default function App() {
  return (
    <>
      <Header></Header>
      <AppRouter menuOptions={menuOptions}></AppRouter>
    </>
  );
}
