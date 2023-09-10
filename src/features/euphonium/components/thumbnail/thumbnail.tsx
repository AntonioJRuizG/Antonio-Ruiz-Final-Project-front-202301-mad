import { Link } from "react-router-dom";
import { EuphoniumProps } from "../../model/euphonium.model";

import style from "./thumbnail.style.module.scss";
import { UserResponseBody } from "../../../user/model/user.model";
import EditIcon from "../../../../common/icons/edit.icon";
import RemoveIcon from "../../../../common/icons/remove.icon";

type EuphoniumPropsThumbnail = {
  item: EuphoniumProps;
  user: UserResponseBody;
  deleteEuphonium: (arg: string, arg2: string) => void;
};

export function Thumbnail({
  item,
  deleteEuphonium,
  user,
}: EuphoniumPropsThumbnail) {
  const handleDelete = () => {
    deleteEuphonium(item.id, user.token);
  };

  return (
    <div className={style.card + "grid-item"}>
      <Link to={`/detalles/${item.id}`}>
        <div className={style.cardImgContainer}>
          <div className={style.cardImgWrapper}>
            <img height={160} width={160} src={item.image} alt={item.alias} />

            <div className={style.cardHoverContent}>
              {user && user.user?.id === item.creator?.id && (
                <div className={style.cardUserBtns}>
                  <button className={style.cardButton}>
                    <Link to={`/editar/${item.id}`}>
                      <EditIcon></EditIcon>
                    </Link>
                  </button>

                  <button className={style.cardButton} onClick={handleDelete}>
                    <RemoveIcon></RemoveIcon>
                  </button>
                </div>
              )}

              <div className={style.cardInfo}>
                <p className={style.cardInfoAlias}>{item.alias}</p>
                <p className={style.cardInfoCreator}>{item.creator?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
