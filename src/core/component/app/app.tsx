import { LoginForm } from "../../../features/user/components/login/login";
import { RegisterForm } from "../../../features/user/components/register/register";
import "./app.css";

export type MenuOptions = {
  label: string;
  path: string;
};

export const menuOptions: MenuOptions[] = [
  { label: "Register", path: "/" },
  { label: "Login", path: "/about" },
];

export function App() {
  return (
    <>
      <h1>Comunidad del bombardino</h1>
      <RegisterForm></RegisterForm>
      <LoginForm></LoginForm>
    </>
  );
}
