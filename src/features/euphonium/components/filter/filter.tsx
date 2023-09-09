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
];

export function GalleryFilter() {
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { clearEuphoniumsList } = useEuphonium(repo);

  const { restartPagination } = usePagination();
  const { loadFilter, filter } = useFilter();

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    clearEuphoniumsList();
    restartPagination();
    loadFilter(value);
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
                    <option key={option.id} value={option.value}>
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
