import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hook/use.user.hook";
import { UserRepo } from "../../services/repository/user.repo";

import style from "./logout.btn.style.module.scss";

export function LogoutBtn() {
  const navigate = useNavigate();

  const repo = useMemo(() => new UserRepo(), []);
  const { loggoutUser } = useUsers(repo);

  const handlerLogout = async () => {
    loggoutUser();
    navigate("/");
  };

  return (
    <button className={style.mainMenuBtn} onClick={() => handlerLogout()}>
      Cerrar sesión
    </button>
  );
}
