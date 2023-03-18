import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hook/use.user.hook";
import { ProtoUser } from "../../model/user.model";
import { UserRepo } from "../../services/repository/user.repo";

import style from "./register.style.module.scss";

export function RegisterForm() {
  const repo = useMemo(() => new UserRepo(), []);
  const { regUser } = useUsers(repo);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");

    const newUser = new ProtoUser(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value
    );
    regUser(newUser);
    form.reset();
  };

  return (
    <div className={style.register_page}>
      <section className={style.register_section}>
        <div className={style.register_header}>
          <h2>Registro de usuario</h2>
        </div>
        <div className={style.register_form}>
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" name="firstName" placeholder="Nombre" />
            </label>
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
            <button type="submit">Registro</button>
          </form>
        </div>
      </section>
    </div>
  );
}
