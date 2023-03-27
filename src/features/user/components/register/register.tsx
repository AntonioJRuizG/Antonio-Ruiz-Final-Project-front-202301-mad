import { SyntheticEvent, useMemo } from "react";
import Swal from "sweetalert2";
import { useUsers } from "../../hook/use.user.hook";
import { UserProps } from "../../model/user.model";
import { UserRepo } from "../../services/repository/user.repo";

import style from "./register.style.module.scss";

export function RegisterForm() {
  const repo = useMemo(() => new UserRepo(), []);
  const { regUser } = useUsers(repo);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");

    const registerUser: Partial<UserProps> = {
      name: inputs[0].value,
      email: inputs[1].value,
      password: inputs[2].value,
    };

    regUser(registerUser);
    form.reset();
  };

  return (
    <div className={style.registerPage}>
      <section className={style.registerSection}>
        <div className={style.registerHeader}>
          <h2>Registro de usuario</h2>
        </div>
        <div className={style.registerForm}>
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
            <button
              type="submit"
              onClick={() =>
                Swal.fire({
                  text: "Registrado!",
                  width: 250,
                  padding: "1em",
                  color: "#fff",
                  background: "#4d4d4d",
                  backdrop: `
    rgba(123,123,123,0.4)
  `,
                })
              }
            >
              Registro
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
