import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useBombardino } from "../../../features/bombardino/hook/use.bombardino.hook";
import { BombardinoStructure } from "../../../features/bombardino/model/bombardino.model";
import { BombardinoRepo } from "../../../features/bombardino/services/repository/bombardino.repo";

import style from "./gallery.style.module.scss";

export function Gallery() {
  const repo = useMemo(() => new BombardinoRepo(), []);
  const { bombardinos } = useBombardino(repo);

  return (
    <>
      <h1 className={style.gallery_title}>Galería</h1>
      <section className={style.gallery}>
        <ul className={style.gallery_list}>
          {bombardinos.map((item: BombardinoStructure) => (
            <Link to={`/details/${item.id}`} relative="path">
              <li key={item.id} className={style.gallery_list_item}>
                <div>
                  <p className={style.gallery_list_item_buttons}>🖊 ✖</p>
                </div>

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
                        <span>Fabricante:</span> {item.manufacturer}
                      </p>
                    </li>
                  </ul>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
}
