import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hook/use.user.hook";
import { UserProps } from "../../model/user.model";
import { UserRepo } from "../../services/repository/user.repo";

import style from "./login.style.module.scss";

export function LoginForm() {
  const repo = useMemo(() => new UserRepo(), []);
  const { logUser } = useUsers(repo);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");

    const currentUser: Partial<UserProps> = {
      email: inputs[0].value,
      pw: inputs[1].value,
    };
    logUser(currentUser);
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
