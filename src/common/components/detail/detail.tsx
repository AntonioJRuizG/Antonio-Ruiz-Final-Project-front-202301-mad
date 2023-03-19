import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useBombardino } from "../../../features/bombardino/hook/use.bombardino.hook";
import { BombardinoRepo } from "../../../features/bombardino/services/repository/bombardino.repo";

import style from "./detail.style.module.scss";

export const Detail = () => {
  let { instrumentId } = useParams();

  const repo = useMemo(() => new BombardinoRepo(), []);
  const { bombardinos, loadOneBombardino } = useBombardino(repo);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bombardinoDetail, setBombardinoDetail] = useState<{
    [key: string]: any;
  }>();

  const storeBombardino = bombardinos.find((item) => item.id === instrumentId);

  useEffect(() => {
    const loadBombardino = async () => {
      const bombardinoDetail = await loadOneBombardino(instrumentId as string);
      console.log(bombardinoDetail);
      setBombardinoDetail(bombardinoDetail);
    };
    loadBombardino();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instrumentId]);

  /* if (bombardinoDetail === undefined) {
    return (
      <div className={style.loading}>
        <p>🔄 Loading...</p>
      </div>
    );
  } */

  return (
    <div className={style.detailPage}>
      <section className={style.detail}>
        <h2>Detalles del bombardino {" " + storeBombardino?.alias}</h2>
        <div className={style.detailCard}>
          <img
            className={style.detailImg}
            src={storeBombardino?.image}
            alt={"Detalles del bombardino de " + storeBombardino?.alias}
          />

          <div className={style.detailsList}>
            <ul>
              <li className={style.detailItem}>
                Fabricante: {storeBombardino?.manufacturer}
              </li>
              <li className={style.detailItem}>
                Modelo: {storeBombardino?.instrumentModel}
              </li>
              <li className={style.detailItem}>
                Nivel: {storeBombardino?.level}
              </li>
              <li className={style.detailItem}>
                Número de pistones: {storeBombardino?.valves}
              </li>
              {/* Temp: <li className="detail-title__li">
            Owner: {storeBombardino?.creator.name}
          </li> */}
              <li className={style.detailItem}>
                Para 'marching band': {storeBombardino?.marchingBand}
              </li>
            </ul>
          </div>
        </div>
        <div className={style.back}>
          <Link to="/">⬅ Volver</Link>
        </div>
      </section>
    </div>
  );
};
