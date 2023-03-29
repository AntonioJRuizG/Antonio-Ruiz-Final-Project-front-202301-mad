import { useMemo } from "react";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { UserRepo } from "../../../features/user/services/repository/user.repo";

import style from "./current.user.style.module.scss";

export function CurrentUserName() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  return (
    <>
      {user.user && (
        <div className={style.userName}>Hola {user.user?.name}!</div>
      )}
    </>
  );
}
