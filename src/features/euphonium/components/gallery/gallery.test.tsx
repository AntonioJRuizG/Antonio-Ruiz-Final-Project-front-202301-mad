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

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../../user/services/repository/user.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");
jest.mock("../../../../common/hooks/pagination.hook/use.pagination.hook");
jest.mock("../../../../common/components/loading/loading");

describe("Given Gallery", () => {
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
        nextPage: jest.fn(),
        restartPagination: jest.fn(),
      });

      await act(async () => {
        await render(
          <Router>
            <Gallery></Gallery>
          </Router>
        );
      });
    });

    test("Then it should be called in the document", async () => {
      const element = screen.getByRole("heading");
      const buttons = screen.getAllByRole("button");
      expect(element).toBeInTheDocument();
      expect(buttons[0]).toBeInTheDocument();
    });

    describe("When click the first Link", () => {
      test("Then it should call the removeFilterHandler", async () => {
        const buttons = screen.getAllByRole("button");
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
        const buttons = screen.getAllByRole("button");
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
        const buttons = screen.getAllByRole("button");
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
        const buttons = screen.getAllByRole("button");
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
        const buttons = screen.getAllByRole("button");
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
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          await userEvent.click(buttons[6]);
        });

        expect(buttons[6]).toBeInTheDocument();
        expect(usePagination().nextPage).toHaveBeenCalled();
      });
    });
  });

  describe("When it is render with empty euphoniums state", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [],
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
        nextPage: jest.fn(),
        restartPagination: jest.fn(),
      });

      render(
        <Router>
          <Gallery></Gallery>
        </Router>
      );
    });

    test("Then it should be called", async () => {
      const element = screen.getAllByRole("generic");
      expect(element[0]).toBeInTheDocument();
    });

    describe("When it reder", () => {
      test("Then de component LoadingSpin should have been called", () => {
        expect(LoadingSpin).toHaveBeenCalled();
      });
    });
  });
});
