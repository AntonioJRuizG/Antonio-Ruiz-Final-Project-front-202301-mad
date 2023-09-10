/* eslint-disable react-hooks/exhaustive-deps */
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumProps } from "../../model/euphonium.model";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { LoadingSpin } from "../../../../common/components/loading/loading";
import { Thumbnail } from "../thumbnail/thumbnail";
import { UserRepo } from "../../../user/services/repository/user.repo";
import { useUsers } from "../../../user/hook/use.user.hook";
import { GalleryFilter } from "../filter/filter";
import { useMemo } from "react";

import style from "./gallery.style.module.scss";
import { NavButtons } from "../navigation.buttons/navigation.buttons";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function Gallery() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  const repoEuphoniums = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums, deleteEuphonium } = useEuphonium(repoEuphoniums);

  const { page } = usePagination();

  return (
    <>
      <section className={style.gallery}>
        <div className={style.galleryMenu}>
          <nav className={style.filterContainer}>
            <GalleryFilter></GalleryFilter>
          </nav>
          <p className={style.galleryPage}>
            {page.currentPage} of {3} pages
          </p>
        </div>
        {!euphoniums.length ? (
          <div className={style.spin}>
            <LoadingSpin></LoadingSpin>
          </div>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 550: 2, 800: 3, 1000: 4 }}
          >
            <Masonry gutter="5px" className={style.galleryList}>
              {euphoniums.map((item: EuphoniumProps) => (
                <Thumbnail
                  key={item.id}
                  item={item}
                  deleteEuphonium={deleteEuphonium}
                  user={user}
                ></Thumbnail>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}

        <div className={style.btnContainer}>
          <NavButtons></NavButtons>
        </div>
      </section>
    </>
  );
}
