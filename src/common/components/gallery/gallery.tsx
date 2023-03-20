import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useEuphonium } from "../../../features/euphonium/hook/use.euphonium.hook";
import { EuphoniumStructure } from "../../../features/euphonium/model/euphonium.model";
import { EuphoniumRepo } from "../../../features/euphonium/services/repository/euphonium.repo";

import style from "./gallery.style.module.scss";

export function Gallery() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums, deleteEuphonium } = useEuphonium(repo);

  return (
    <>
      <h1 className={style.gallery_title}>Galería</h1>
      <section className={style.gallery}>
        <ul className={style.gallery_list}>
          {euphoniums.map((item: EuphoniumStructure) => (
            <li key={item.id} className={style.gallery_list_item}>
              <div>
                <p className={style.gallery_list_item_buttons}>
                  🖊
                  <button
                    className={style.gallery_list_item_buttons}
                    onClick={() => {
                      deleteEuphonium(item.id);
                    }}
                  >
                    ✖
                  </button>
                </p>
              </div>
              <Link to={`/details/${item.id}`} relative="path">
                <img
                  className={style.gallery_list_item_img}
                  src={item.image}
                  alt={item.alias}
                />

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
