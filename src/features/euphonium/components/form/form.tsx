import { SyntheticEvent, useMemo, useState } from "react";
import { EuphoniumProps } from "../../model/euphonium.model";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { useEuphonium } from "../../hook/use.euphonium.hook";

import style from "./form.style.module.scss";
import { Link, useParams } from "react-router-dom";
import { UserRepo } from "../../../user/services/repository/user.repo";
import { useUsers } from "../../../user/hook/use.user.hook";

export const AddEditForm = () => {
  let { instrumentEditId } = useParams();
  const AddMode = !instrumentEditId;
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { addEuphonium, euphoniums, updateEuphonium } = useEuphonium(repo);
  const repoUser = useMemo(() => new UserRepo(), []);
  const { users } = useUsers(repoUser);

  const storeEuphonium = euphoniums.find(
    (item) => item.id === instrumentEditId
  );

  const initialItemData: EuphoniumProps = {
    id: "",
    alias: "",
    manufacturer: "",
    instrumentModel: "",
    material: "",
    valves: 4,
  } as EuphoniumProps;

  const [euphoniumData, setEuphoniumData] = useState(initialItemData);

  const handleChange = (ev: SyntheticEvent) => {
    const element = ev.target as HTMLFormElement;
    setEuphoniumData({
      ...euphoniumData,
      [element.name]: element.value,
    });
  };

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formData = ev.currentTarget as HTMLFormElement;
    let image = (formData.elements[5] as HTMLFormElement).files?.item(0);

    if (!AddMode) {
      instrumentEditId && (euphoniumData.id = instrumentEditId);
      updateEuphonium(euphoniumData, users.token, image);
    } else {
      addEuphonium(euphoniumData, users.token, image);
    }
  };

  return (
    <div className={style.formPage}>
      <section className={style.form}>
        <h2>{AddMode ? "Añade tu bombardino" : "Edita tu bombardino"}</h2>
        <div className={style.formContainer}>
          {!AddMode && (
            <img
              className={style.detailImg}
              src={storeEuphonium?.image}
              alt={"Imagen del bombardino de " + storeEuphonium?.alias}
            />
          )}
          <form className={style.formList} action="" onSubmit={handleSubmit}>
            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="alias">Alias</label>
              </div>
              <div>
                <input
                  className={style.formInput}
                  type="text"
                  id="alias"
                  name="alias"
                  onChange={handleChange}
                  placeholder="Alias"
                  defaultValue={storeEuphonium?.alias}
                  required
                />
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="manufacturer">Fabricante</label>
              </div>

              <div>
                <input
                  className={style.formInput}
                  type="manufacturer"
                  id="manufacturer"
                  name="manufacturer"
                  onChange={handleChange}
                  placeholder="Fabricante"
                  defaultValue={storeEuphonium?.manufacturer}
                  required
                />
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="instrumentModel">Modelo</label>
              </div>
              <div>
                <input
                  className={style.formInput}
                  type="instrumentModel"
                  id="instrumentModel"
                  name="instrumentModel"
                  onChange={handleChange}
                  placeholder="Modelo"
                  defaultValue={storeEuphonium?.instrumentModel}
                  required
                />
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="valves">Nº de pistones</label>
              </div>
              <div>
                <select
                  className={style.formSelector}
                  name="valves"
                  id="valves"
                  onChange={handleChange}
                  defaultValue={storeEuphonium?.valves}
                  required
                >
                  <option></option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <div>
                  <label htmlFor="material">Material: </label>
                </div>
                <div>
                  <select
                    className={style.formSelector}
                    name="material"
                    id="material"
                    onChange={handleChange}
                    defaultValue={storeEuphonium?.material}
                    required
                  >
                    <option></option>
                    <option value="Plateado">Plateado</option>
                    <option value="Dorado">Dorado</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.formInputContainer}>
              <div>
                <div>
                  <label htmlFor="image">Imagen: </label>
                </div>
                <div>
                  <input
                    className={style.formImgInput}
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Image"
                  />
                </div>
              </div>
            </div>
            <div>
              <button className={style.formButton} type="submit">
                {AddMode ? "Añadir" : "Editar"}
              </button>
            </div>
          </form>
        </div>
        <div className={style.back}>
          <Link to="/">⬅ Volver</Link>
        </div>
      </section>
    </div>
  );
};
