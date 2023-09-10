import { Link } from "react-router-dom";
import { MenuOptions } from "../../../app/app";
import style from "./featured.style.module.scss";
import { CurrentUserName } from "../../../features/user/components/current.user/current.user";
import { useMemo } from "react";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { UserRepo } from "../../../features/user/services/repository/user.repo";

export const menuOptionsPublic: MenuOptions[] = [
  { id: "1", label: "Sign up for free", path: "/registro" },
];

export function Featured() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  return (
    <section className={style.header}>
      <h2 className={style.headerTitle}>
        {<CurrentUserName></CurrentUserName>}
      </h2>
      <h3>
        Share your personal music instrument, your band and favourite songs
      </h3>
      <div className={style.headerButtonsContainer}>
        {user?.user ? null : (
          <div className={style.headerButtons}>
            {menuOptionsPublic.map((menuOpt) => (
              <Link key={menuOpt.id} to={menuOpt.path}>
                {menuOpt.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
