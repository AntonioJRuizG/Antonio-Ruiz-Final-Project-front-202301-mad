import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useEuphonium } from "../../../features/euphonium/hook/use.euphonium.hook";
import { EuphoniumStructure } from "../../../features/euphonium/model/euphonium.model";
import { EuphoniumRepo } from "../../../features/euphonium/services/repository/euphonium.repo";

import style from "./gallery.style.module.scss";

export function Gallery() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums, deleteEuphonium } = useEuphonium(repo);

  /*  Subir al estado un usuario para saber la id del que esta logeado.
 const repoUser = useMemo(() => new UserRepo(), []);
  const { users } = useUsers(repoUser);

  if (users !== undefined) console.log(users[0]?.id); */

  return (
    <>
      <h1 className={style.gallery_title}>Galería</h1>
      <section className={style.gallery}>
        <ul className={style.gallery_list}>
          {euphoniums.map((item: EuphoniumStructure) => (
            <li key={item.id} className={style.gallery_list_item}>
              <div>
                <p className={style.gallery_list_item_buttons}>
                  {localStorage.getItem("userid") === item.creator?.id && (
                    <>
                      <button className={style.card_button}>
                        <Link to={"/editar"}>🖊</Link>
                      </button>

                      <button
                        className={style.card_button}
                        onClick={() => {
                          deleteEuphonium(item.id);
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
