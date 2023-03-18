import { SyntheticEvent, useMemo } from "react";
import { storage } from "../../../../utils/storage";
import { useUsers } from "../../hook/use.user.hook";
import { ProtoUser } from "../../model/user.model";
import { UserRepo } from "../../services/repository/user.repo";

import style from "./login.style.module.scss";

const token = storage.get("token");

export function LoginForm() {
  localStorage.setItem("token", token);
  localStorage.getItem("token");

  const repo = useMemo(() => new UserRepo(), []);
  const { logUser } = useUsers(repo);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");

    const newUser = new ProtoUser("", inputs[0].value, inputs[1].value);
    logUser(newUser, token);
    form.reset();
  };

  return (
    <div className={style.login_page}>
      <section className={style.login_section}>
        <div className={style.login_header}>
          <h2>Inicio de sesión</h2>
        </div>
        <div className={style.login_form}>
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" name="email" placeholder="Correo" required />
            </label>
            <label>
              <input
                type="password"
                name="password"
                placeholder="Clave de acceso"
                required
              />
            </label>
            <button type="submit">Entrar</button>
          </form>
        </div>
      </section>
    </div>
  );
}
