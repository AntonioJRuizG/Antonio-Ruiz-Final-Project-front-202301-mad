/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";

import style from "./filter.style.module.scss";
import { useFilter } from "../../../../common/hooks/filter.hook/use.filter.hook";

export type MenuOptions = {
  id: string;
  label: string;
  path: string;
};

interface Option {
  id: number;
  label: string;
  value: string;
  category: string;
}

const options: Option[] = [
  { id: 1, label: "Silver", value: "Plateado", category: "Material" },
  { id: 2, label: "Gold", value: "Dorado", category: "Material" },
  { id: 3, label: "Other", value: "Otros", category: "Material" },
  { id: 4, label: "Miraphone", value: "Miraphone", category: "Manufacturer" },
  { id: 5, label: "Yamaha", value: "Yamaha", category: "Manufacturer" },
  { id: 6, label: "Eastmann", value: "Eastmann", category: "Manufacturer" },
  { id: 7, label: "3", value: "3", category: "Valves" },
  { id: 8, label: "4", value: "4", category: "Valves" },
];

export function GalleryFilter() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { clearEuphoniumsList } = useEuphonium(repo);

  const { restartPagination } = usePagination();
  const { loadFilter, filter } = useFilter();

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const optionId: number = Number(event.target.value);
    const option: Option = options.find((item) => item.id === optionId)!;
    clearEuphoniumsList();
    restartPagination();
    loadFilter(option.value, option.category.toLocaleLowerCase());
  };

  return (
    <>
      <div>
        <select
          className={style.mainMenuListLink}
          id="selector"
          value={filter?.filter || ""}
          onChange={handleOptionChange}
        >
          <option value="">Filter by</option>
          {Array.from(new Set(options.map((option) => option.category))).map(
            (category) => (
              <optgroup label={category} key={category}>
                {options
                  .filter((option) => option.category === category)
                  .map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
              </optgroup>
            )
          )}
        </select>
      </div>
    </>
  );
}
