import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MenuOptions } from "../app/app";
import { Detail } from "../features/euphonium/components/detail/detail";
import EditPage from "../pages/edit/edit.page";

const GalleryPage = lazy(() => import("../pages/gallery/gallery.page"));
const AddPage = lazy(() => import("../pages/add/add.page"));
const RegisterPage = lazy(() => import("../pages/register/register.page"));
const LoginPage = lazy(() => import("../pages/login/login.page"));

type AppRouterProps = {
  menuOptions: MenuOptions[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<GalleryPage></GalleryPage>}></Route>
        <Route path={menuOptions[1].path} element={<AddPage></AddPage>}></Route>
        <Route
          path={menuOptions[2].path}
          element={<RegisterPage></RegisterPage>}
        ></Route>
        <Route
          path={menuOptions[3].path}
          element={<LoginPage></LoginPage>}
        ></Route>
        <Route
          path={"/detalles/:instrumentId"}
          element={<Detail></Detail>}
        ></Route>
        <Route
          path={"/editar/:instrumentEditId"}
          element={<EditPage></EditPage>}
        ></Route>
      </Routes>
    </Suspense>
  );
}
