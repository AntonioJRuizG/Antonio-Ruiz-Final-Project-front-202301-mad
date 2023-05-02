/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { useUsers } from "../../../user/hook/use.user.hook";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { Gallery } from "./gallery";
import { LoadingSpin } from "../../../../common/components/loading/loading";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";
import { useFilter } from "../../../../common/hooks/filter.hook/use.filter.hook";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../../user/services/repository/user.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");
jest.mock("../../../../common/hooks/pagination.hook/use.pagination.hook");
jest.mock("../../../../common/hooks/filter.hook/use.filter.hook");
jest.mock("../../../../common/components/loading/loading");

describe("Given Gallery", () => {
  let buttons: HTMLElement[];
  const mockEuphoniumRepo = {} as EuphoniumRepo;
  describe("When it is render with euphoniums", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [{ id: "1", creator: { id: "1" } }, { id: "2" }],
        deleteEuphonium: jest.fn(),
        loadEuphoniumsPaginated: jest.fn(),
        loadEuphoniumsFiltered: jest.fn(),
        clearEuphoniumsList: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });

      (usePagination as jest.Mock).mockReturnValue({
        page: { currentPage: 2 },
        nextPage: jest.fn(),
        prevPage: jest.fn(),
        restartPagination: jest.fn(),
      });

      (useFilter as jest.Mock).mockReturnValue({
        loadFilter: jest.fn(),
        clearFilter: jest.fn(),
      });

      render(
        <Router>
          <Gallery></Gallery>
        </Router>
      );

      buttons = screen.getAllByRole("button");
    });

    test("Then it should be called in the document", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
      expect(buttons[0]).toBeInTheDocument();
    });

    describe("When click the first Link", () => {
      test("Then it should call the removeFilterHandler", async () => {
        await act(async () => {
          await userEvent.click(buttons[0]);
        });

        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(usePagination().restartPagination).toHaveBeenCalled();
      });
    });

    describe("When click the second Button", () => {
      test("Then it should call the filterHandler", async () => {
        await act(async () => {
          await userEvent.click(buttons[1]);
        });
        expect(buttons[1]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(usePagination().restartPagination).toHaveBeenCalled();
      });
    });

    describe("When click the third Button", () => {
      test("Then it should call the filterHandler", async () => {
        await act(async () => {
          await userEvent.click(buttons[2]);
        });
        expect(buttons[2]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(usePagination().restartPagination).toHaveBeenCalled();
      });
    });

    describe("When click the fourth Button", () => {
      test("Then it should call the filterHandler", async () => {
        await act(async () => {
          await userEvent.click(buttons[3]);
        });
        expect(buttons[3]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(usePagination().restartPagination).toHaveBeenCalled();
      });
    });

    describe("When click the sixth Button", () => {
      test("Then it should delete the item", async () => {
        await act(async () => {
          await userEvent.click(buttons[5]);
        });
        expect(buttons[5]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).deleteEuphonium
        ).toHaveBeenCalled();
      });
    });

    describe("When click the seventh Button -show more", () => {
      test("Then it should call the loadEuphoniumsPaginated if no filter active", async () => {
        await act(async () => {
          await userEvent.click(buttons[7]);
        });

        expect(buttons[7]).toBeInTheDocument();
        expect(usePagination().nextPage).toHaveBeenCalled();
      });
    });

    describe("When click the eigth Button -show less", () => {
      test("Then it should call the loadEuphoniumsPaginated if no filter active", async () => {
        await act(async () => {
          await userEvent.click(buttons[6]);
        });

        expect(buttons[6]).toBeInTheDocument();
        expect(usePagination().prevPage).toHaveBeenCalled();
      });
    });
  });

  describe("When it renders with empty euphoniums state", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [],
      });

      (useUsers as jest.Mock).mockReturnValue({});

      (usePagination as jest.Mock).mockReturnValue({});

      (useFilter as jest.Mock).mockReturnValue({});

      render(
        <Router>
          <Gallery></Gallery>
        </Router>
      );
    });

    test("Then de component LoadingSpin should have been called", async () => {
      expect(LoadingSpin).toHaveBeenCalled();
    });
  });
});
