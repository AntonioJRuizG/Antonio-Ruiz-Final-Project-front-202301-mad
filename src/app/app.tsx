import { Featured } from "../common/components/featured/featured";
import { Header } from "../common/components/header/header";
import { Intro } from "../common/components/intro/intro";
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
      <Featured></Featured>
      <Intro></Intro>
      <AppRouter></AppRouter>
    </>
  );
}
