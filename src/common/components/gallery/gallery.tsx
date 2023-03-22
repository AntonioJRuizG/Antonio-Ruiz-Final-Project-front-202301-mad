import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useEuphonium } from "../../../features/euphonium/hook/use.euphonium.hook";
import { EuphoniumProps } from "../../../features/euphonium/model/euphonium.model";
import { EuphoniumRepo } from "../../../features/euphonium/services/repository/euphonium.repo";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { UserRepo } from "../../../features/user/services/repository/user.repo";

import style from "./gallery.style.module.scss";

export function Gallery() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums, deleteEuphonium } = useEuphonium(repo);

  const repoUser = useMemo(() => new UserRepo(), []);
  const { users } = useUsers(repoUser);

  return (
    <>
      <h1 className={style.gallery_title}>Galería</h1>
      <section className={style.gallery}>
        <ul className={style.gallery_list}>
          {euphoniums.map((item: EuphoniumProps) => (
            <li key={item.id} className={style.gallery_list_item}>
              <div>
                <p className={style.gallery_list_item_buttons}>
                  {users.user?.id === item.creator?.id && (
                    <>
                      <button className={style.card_button}>
                        <Link to={`/editar/${item.id}`} relative="path">
                          🖊
                        </Link>
                      </button>

                      <button
                        className={style.card_button}
                        onClick={() => {
                          deleteEuphonium(item.id, users.token);
                        }}
                      >
                        ✖
                      </button>
                    </>
                  )}
                </p>
              </div>
              <Link to={`/details/${item.id}`} relative="path">
                <div className={style.gallery_img_box}>
                  <div className={style.gallery_list_item_img}>
                    <img src={item.image} alt={item.alias} />
                  </div>
                </div>
                <div className={style.gallery_list_item_info}>
                  <ul>
                    <li>
                      <p className={style.gallery_list_item_info_alias}>
                        <span>Alias:</span> {item.alias}
                      </p>
                    </li>
                    <li>
                      <p className={style.gallery_list_item_info_creator}>
                        <span>Miembro:</span> {item.creator?.name}
                      </p>
                    </li>
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
