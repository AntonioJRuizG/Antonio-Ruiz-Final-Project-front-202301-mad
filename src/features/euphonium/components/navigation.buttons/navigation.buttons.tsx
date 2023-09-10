import { useMemo } from "react";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { useEuphonium } from "../../hook/use.euphonium.hook";

import style from "./navigation.buttons.style.module.scss";
import LeftArrow from "../../../../common/icons/left.arrow";
import RigthArrow from "../../../../common/icons/rigth.arrow";

export function NavButtons() {
  const repoEuphoniums = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums } = useEuphonium(repoEuphoniums);

  const { page, nextPage, prevPage } = usePagination();

  const showLessHandler = () => {
    prevPage();
  };

  const showMoreHandler = () => {
    nextPage();
  };

  return (
    <>
      {euphoniums.length > 0 && page.currentPage > 1 && (
        <button
          className={style.navBtn + " " + style.navBtnPrev}
          onClick={showLessHandler}
        >
          <LeftArrow></LeftArrow>
          Previous
        </button>
      )}

      {euphoniums.length > 0 && euphoniums.length === 8 && (
        <button
          className={style.navBtn + " " + style.navBtnNext}
          onClick={showMoreHandler}
        >
          Next
          <RigthArrow></RigthArrow>
        </button>
      )}
    </>
  );
}
