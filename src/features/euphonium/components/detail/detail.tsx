import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";

import style from "./detail.style.module.scss";

export const Detail = () => {
  let { instrumentId } = useParams();

  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums } = useEuphonium(repo);

  /*   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bombardinoDetail, setBombardinoDetail] = useState<{
    [key: string]: any;
  }>(); */

  const storeEuphonium = euphoniums.find((item) => item.id === instrumentId);

  /* Temporal comment
  useEffect(() => {
    const loadBombardino = async () => {
      const bombardinoDetail = await loadOneBombardino(instrumentId as string);
      console.log(bombardinoDetail);
      setBombardinoDetail(bombardinoDetail);
    };
    loadBombardino();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instrumentId]); */

  /* Temporal comment.
  if (bombardinoDetail === undefined) {
    return (
      <div className={style.loading}>
        <p>🔄 Loading...</p>
      </div>
    );
  } */

  return (
    <div className={style.detailPage}>
      <section className={style.detail}>
        <h2>Detalles del bombardino {" " + storeEuphonium?.alias}</h2>
        <div className={style.detailCard}>
          <img
            className={style.detailImg}
            src={storeEuphonium?.image}
            alt={"Imagen del bombardino de " + storeEuphonium?.alias}
          />

          <div className={style.detailsList}>
            <ul>
              <li className={style.detailItem}>
                Fabricante: {storeEuphonium?.manufacturer}
              </li>
              <li className={style.detailItem}>
                Modelo: {storeEuphonium?.instrumentModel}
              </li>
              <li className={style.detailItem}>
                Nivel: {storeEuphonium?.level}
              </li>
              <li className={style.detailItem}>
                Número de pistones: {storeEuphonium?.valves}
              </li>
              {/* Temp: <li className="detail-title__li">
            Owner: {storeEuphonium?.creator.name}
          </li> */}
              <li className={style.detailItem}>
                Para 'marching band': {storeEuphonium?.marchingBand}
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
