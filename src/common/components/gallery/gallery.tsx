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
      <h1>Galería</h1>
      <section className={style.gallery}>
        <ul className={style.gallery_list}>
          {bombardinos.map((item: BombardinoStructure) => (
            <li key={item.id} className={style.gallery_list_item}>
              <div className="character-card">
                <Link to={`/details/${item.id}`} relative="path">
                  <img
                    className={style.gallery_list_item_img}
                    src={item.image}
                    alt={item.alias}
                  />
                </Link>
                <div className={style.gallery_list_item_info}>
                  <ul>
                    <li>
                      <p className={style.gallery_list_item_info_manufacturer}>
                        {item.manufacturer}
                      </p>
                    </li>
                    <li>
                      <p className={style.gallery_list_item_info_alias}>
                        {item.alias}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
