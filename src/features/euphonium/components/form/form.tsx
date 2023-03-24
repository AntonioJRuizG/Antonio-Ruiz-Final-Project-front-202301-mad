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
    alias: "",
    manufacturer: "",
    instrumentModel: "",
    level: "",
    valves: 4,
  } as EuphoniumProps;

  const [euphiumData, setEuphiumData] = useState(initialItemData);

  const handleChange = (ev: SyntheticEvent) => {
    const element = ev.target as HTMLFormElement;
    setEuphiumData({
      ...euphiumData,
      [element.name]: element.value,
    });
  };

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formData = ev.currentTarget as HTMLFormElement;
    const image = (formData.elements[6] as HTMLFormElement).files?.item(0);

    if (!AddMode) {
      euphiumData.id = instrumentEditId!;
      updateEuphonium(euphiumData, users.token);
    } else {
      addEuphonium(euphiumData, users.token, image);
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
                  <label htmlFor="level">Nivel: </label>
                </div>
                <div>
                  <select
                    className={style.formSelector}
                    name="level"
                    id="level"
                    onChange={handleChange}
                    defaultValue={storeEuphonium?.level}
                    required
                  >
                    <option></option>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Profesional">Profesional</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.formInputContainer}>
              <div>
                <div>
                  <label htmlFor="level">Imagen: </label>
                </div>
                <div>
                  <input
                    className={style.formImgInput}
                    type="file"
                    name="image"
                    id="image"
                    required
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
