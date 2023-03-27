import { useMemo } from "react";
import { UserRepo } from "../../features/user/services/repository/user.repo";
import { useUsers } from "../../features/user/hook/use.user.hook";
import { menuOptionsPrivate, PrivateMenu } from "./private.menu/private.menu";
import { menuOptionsPublic, PublicMenu } from "./public.menu/public.menu";

export function Menu() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);
  return (
    <>
      {user.token ? (
        <PrivateMenu menuOptionsPrivate={menuOptionsPrivate}></PrivateMenu>
      ) : (
        <PublicMenu menuOptionsPublic={menuOptionsPublic}></PublicMenu>
      )}
    </>
  );
}
