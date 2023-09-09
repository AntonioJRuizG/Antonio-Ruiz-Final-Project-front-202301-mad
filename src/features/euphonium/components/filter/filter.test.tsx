/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";
import { useFilter } from "../../../../common/hooks/filter.hook/use.filter.hook";
import { GalleryFilter } from "./filter";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../../common/hooks/pagination.hook/use.pagination.hook");
jest.mock("../../../../common/hooks/filter.hook/use.filter.hook");

describe("Given GalleryFilter component", () => {
  let elements: HTMLElement[];
  const mockEuphoniumRepo = {} as EuphoniumRepo;
  describe("When it renders", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        clearEuphoniumsList: jest.fn(),
      });

      (usePagination as jest.Mock).mockReturnValue({
        restartPagination: jest.fn(),
      });

      (useFilter as jest.Mock).mockReturnValue({
        loadFilter: jest.fn(),
        clearFilter: jest.fn(),
      });

      render(<GalleryFilter></GalleryFilter>);

      elements = [
        ...screen.getAllByRole("combobox"),
        ...screen.getAllByRole("option"),
      ];
    });

    test("Then it should be in the document", async () => {
      expect(elements[0]).toBeInTheDocument();
    });

    test("Then it should call the handle change function when option selected", () => {
      fireEvent.change(elements[0], { target: { value: "Plateado" } });
      expect(
        useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
      ).toHaveBeenCalled();
      expect(usePagination().restartPagination).toHaveBeenCalled();
      expect(useFilter().loadFilter).toHaveBeenCalled();
    });
  });
});
