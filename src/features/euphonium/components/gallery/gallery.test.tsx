/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../../../store/store";
import { useUsers } from "../../../user/hook/use.user.hook";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { Gallery } from "./gallery";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../../user/services/repository/user.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");

describe("Given Gallery", () => {
  const mockEuphoniumRepo = {} as EuphoniumRepo;

  (useEuphonium as jest.Mock).mockReturnValue({
    euphoniums: [],
    deleteEuphonium: jest.fn(),
    loadEuphoniumsPaginated: jest.fn(),
  });

  (useUsers as jest.Mock).mockReturnValue({
    users: [],
  });

  beforeEach(async () => {
    (useEuphonium as jest.Mock).mockReturnValue({
      euphoniums: [{ id: "1", creator: { id: "1" } }, { id: "2" }],
      deleteEuphonium: jest.fn(),
      loadEuphoniumsPaginated: jest.fn(),
    });

    (useUsers as jest.Mock).mockReturnValue({
      users: {
        user: { id: "1" },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Gallery></Gallery>
        </Router>
      </Provider>
    );
  });

  describe("When it is render", () => {
    test("Then it should be called", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    describe("When click the first Link", () => {
      test("Then it should link to edit page", async () => {
        const buttons = screen.getAllByRole("button");
        await userEvent.click(buttons[0]);
        expect(buttons[0]).toBeInTheDocument();
      });
    });

    describe("When click the second Link", () => {
      test("Then it should delete the item", async () => {
        const buttons = screen.getAllByRole("button");
        await userEvent.click(buttons[1]);
        expect(buttons[1]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).deleteEuphonium
        ).toHaveBeenCalled();
      });
    });

    describe("When click the third Link", () => {
      test("Then it should calld the loadEuphoniumsPaginated", async () => {
        const buttons = screen.getAllByRole("button");
        await userEvent.click(buttons[2]);
        expect(buttons[2]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).loadEuphoniumsPaginated
        ).toHaveBeenCalled();
      });
    });
  });
});
