import { SyntheticEvent, useMemo, useState } from "react";
import { EuphoniumStructure } from "../../../features/euphonium/model/euphonium.model";
import { EuphoniumRepo } from "../../../features/euphonium/services/repository/euphonium.repo";
import { useEuphonium } from "../../../features/euphonium/hook/use.euphonium.hook";

import style from "./add.style.module.scss";

export const Add = () => {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { addBombardino } = useEuphonium(repo);

  const initialItemData: EuphoniumStructure = {
    alias: "",
    manufacturer: "",
    instrumentModel: "",
    level: "",
    valves: 4,
  } as EuphoniumStructure;

  const [euphiumData, setEuphiumData] = useState(initialItemData);

  const handleChange = (ev: SyntheticEvent) => {
    const element = ev.target as HTMLFormElement;
    const type = element.getAttribute("type");
    setEuphiumData({
      ...euphiumData,
      [element.name]: type === "checkbox" ? element.checked : element.value,
    });
  };

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    addBombardino(euphiumData);
    console.log(euphiumData);
  };

  return (
    <>
      <h2>Formulario controlado</h2>
      <form className={style.detail} action="" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="alias">Alias</label>
          <input
            type="text"
            id="alias"
            name="alias"
            value={euphiumData.alias}
            onChange={handleChange}
            placeholder="Alias"
            required
          />
        </div>
        <div className="formControl">
          <label htmlFor="manufacturer">Fabricante</label>
          <input
            type="manufacturer"
            id="manufacturer"
            name="manufacturer"
            value={euphiumData.manufacturer}
            onChange={handleChange}
            placeholder="Fabricante"
            required
          />
        </div>
        <div className="formControl">
          <label htmlFor="instrumentModel">Modelo</label>
          <input
            type="instrumentModel"
            id="instrumentModel"
            name="instrumentModel"
            value={euphiumData.instrumentModel}
            onChange={handleChange}
            placeholder="Modelo"
            required
          />
        </div>

        <div>
          <fieldset onChange={handleChange}>
            <legend>Número de válvulas</legend>
            <input type="radio" name="gender" id="three" value="3" />
            <label htmlFor="tres">3</label>
            <input type="radio" name="gender" id="four" value="4" />
            <label htmlFor="four">4</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Otros</label>
          </fieldset>
        </div>

        <div>
          <select
            name="category"
            id=""
            value={euphiumData.level}
            onChange={handleChange}
            required
          >
            <option></option>
            <option value="01-st">Principiante</option>
            <option value="02-gd">Intermedio</option>
            <option value="03-pm">Profesional</option>
          </select>
        </div>
        <button type="submit">Añadir</button>
      </form>
    </>
  );
};
