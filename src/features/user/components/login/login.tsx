import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hook/use.user.hook";
import { ProtoUser } from "../../model/user.model";
import { UserRepo } from "../../services/repository/user.repo";

export function LoginForm() {
  const repo = useMemo(() => new UserRepo(), []);
  const { logUser } = useUsers(repo);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");

    const newUser = new ProtoUser("", inputs[0].value, inputs[1].value);
    logUser(newUser);
    form.reset();
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" placeholder="Correo" required />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
