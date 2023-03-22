import { SyntheticEvent, useMemo, useState } from "react";
import { EuphoniumProps } from "../../../features/euphonium/model/euphonium.model";
import { EuphoniumRepo } from "../../../features/euphonium/services/repository/euphonium.repo";
import { useEuphonium } from "../../../features/euphonium/hook/use.euphonium.hook";

import style from "./addupd.form.style.module.scss";
import { useParams } from "react-router-dom";
import { UserRepo } from "../../../features/user/services/repository/user.repo";
import { useUsers } from "../../../features/user/hook/use.user.hook";

export const AddUpdateForm = () => {
  let { instrumentDetailId } = useParams();
  const AddMode = !instrumentDetailId;

  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { addEuphonium, euphoniums, updateEuphonium } = useEuphonium(repo);
  const repoUser = useMemo(() => new UserRepo(), []);
  const { users } = useUsers(repoUser);

  const storeEuphonium = euphoniums.find(
    (item) => item.id === instrumentDetailId
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
    const type = element.getAttribute("type");
    setEuphiumData({
      ...euphiumData,
      [element.name]: type === "radio" ? element.checked : element.value,
    });
  };

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (!AddMode) {
      euphiumData.id = instrumentDetailId!;
      updateEuphonium(euphiumData, users.token);
    } else {
      ev.preventDefault();
      addEuphonium(euphiumData, users.token);
    }
  };

  return (
    <div className={style.addPage}>
      <h2>{AddMode ? "Añade tu bombardino" : "Edita tu bombardino"}</h2>
      <form className={style.detail} action="" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="alias">Alias</label>
          <input
            type="text"
            id="alias"
            name="alias"
            onChange={handleChange}
            placeholder="Alias"
            defaultValue={storeEuphonium?.id}
            required
          />
        </div>
        <div className="formControl">
          <label htmlFor="manufacturer">Fabricante</label>
          <input
            type="manufacturer"
            id="manufacturer"
            name="manufacturer"
            onChange={handleChange}
            placeholder="Fabricante"
            defaultValue={storeEuphonium?.manufacturer}
            required
          />
        </div>
        <div className="formControl">
          <label htmlFor="instrumentModel">Modelo</label>
          <input
            type="instrumentModel"
            id="instrumentModel"
            name="instrumentModel"
            onChange={handleChange}
            placeholder="Modelo"
            defaultValue={storeEuphonium?.instrumentModel}
            required
          />
        </div>

        <div>
          <select
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

        <div>
          <select
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
        <button type="submit">{AddMode ? "Añadir" : "Editar"}</button>
      </form>
    </div>
  );
};
