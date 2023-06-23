import { Link } from "react-router-dom";
import { EuphoniumProps } from "../../model/euphonium.model";

import style from "./thumbnail.style.module.scss";
import { UserResponseBody } from "../../../user/model/user.model";
import Modal from "../../../../common/modal/modal";
import { useState } from "react";

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
  const [showModal, setShowModal] = useState<boolean>(false);

  const onModal = () => {
    setShowModal(true);
  };

  const handleModal = (arg: boolean) => {
    setShowModal(arg);
  };

  return (
    <>
      <div>
        <p className={style.galleryListItemButtons}>
          {user && user.user?.id === item.creator?.id && (
            <>
              <button className={style.cardButton}>
                <Link to={`/editar/${item.id}`}>🖊</Link>
              </button>

              <button className={style.cardButton} onClick={onModal}>
                ✖
              </button>
            </>
          )}
        </p>
      </div>
      <Link to={`/detalles/${item.id}`}>
        <div className={style.galleryImgBox}>
          <div className={style.galleryListItemImg}>
            <img height={160} src={item.image} alt={item.alias} />
          </div>
        </div>
        <div className={style.galleryListItemInfo}>
          <ul>
            <li>
              <p className={style.galleryListItemInfoAlias}>
                <span>Alias:</span> {item.alias}
              </p>
            </li>
            <li>
              <p className={style.galleryListItemInfoCreator}>
                <span>Miembro:</span> {item.creator?.name}
              </p>
            </li>
          </ul>
        </div>
      </Link>
      <Modal
        customFunction={() => deleteEuphonium(item.id, user.token)}
        showModal={showModal}
        handleModal={handleModal}
      ></Modal>
    </>
  );
}
