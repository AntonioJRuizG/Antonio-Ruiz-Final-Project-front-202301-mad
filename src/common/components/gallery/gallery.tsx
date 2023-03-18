import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useBombardino } from "../../../features/bombardino/hook/use.bombardino.hook";
import { BombardinoStructure } from "../../../features/bombardino/model/bombardino.model";
import { BombardinoRepo } from "../../../features/bombardino/services/repository/bombardino.repo";

export function Gallery() {
  const repo = useMemo(() => new BombardinoRepo(), []);
  const { bombardinos } = useBombardino(repo);

  return (
    <>
      <h1>Galería</h1>
      <section className="character-list">
        <ul className="character-list__character">
          {bombardinos.map((item: BombardinoStructure) => (
            <li key={item.id} className="character-colum">
              <div className="character-card">
                <Link to={`/details/${item.id}`} relative="path">
                  <img
                    className="character-card__img"
                    src={item.image}
                    alt={item.alias}
                  />
                </Link>
                <div className="character-card__info">
                  <ul>
                    <li>
                      <p className="character-card__info__name">
                        {item.manufacturer}
                      </p>
                    </li>
                    <li>
                      <p className="character-card__info__name">{item.alias}</p>
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
