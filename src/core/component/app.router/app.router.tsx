import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MenuOptions } from "../app/app";

const RegisterPage = lazy(
  () => import("../../../pages/register/register.page")
);
const LoginPage = lazy(() => import("../../../pages/register/register.page"));

type AppRouterProps = {
  menuOptions: MenuOptions[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<RegisterPage></RegisterPage>}></Route>
        <Route
          path={menuOptions[1].path}
          element={<LoginPage></LoginPage>}
        ></Route>
      </Routes>
    </Suspense>
  );
}
