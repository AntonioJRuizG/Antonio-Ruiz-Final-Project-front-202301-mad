import { useMemo } from "react";
import { useUsers } from "../../hook/use.user.hook";
import { UserRepo } from "../../services/repository/user.repo";

export function CurrentUserName() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  return <> {user.user ? `HELLO ${user.user.name}` : "BE MUSIC"}</>;
}
