/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { useEuphonium } from "../../../features/euphonium/hook/use.euphonium.hook";
import { EuphoniumProps } from "../../../features/euphonium/model/euphonium.model";
import { EuphoniumRepo } from "../../../features/euphonium/services/repository/euphonium.repo";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { UserRepo } from "../../../features/user/services/repository/user.repo";
import { store } from "../../../store/store";
import { Gallery } from "./gallery";

jest.mock("../../../features/euphonium/hook/use.euphonium.hook");
jest.mock("../../../features/user/services/repository/user.repo");
jest.mock("../../../features/euphonium/hook/use.euphonium.hook");
jest.mock("../../../features/user/hook/use.user.hook");

describe("Given Gallery", () => {
  const mockUserRepo = {} as UserRepo;
  const mockEuphoniumRepo = {} as EuphoniumRepo;

  const mockEuphonium1 = {
    id: "1",
    manufacturer: "Mock Manufacturer",
    alias: "Mock Alias",
    image: "mock-image-url",
  } as unknown as EuphoniumProps;

  const mockEuphonium2 = {
    id: "2",
    manufacturer: "Another Mock Manufacturer",
    alias: "Another Mock Alias",
    image: "another-mock-image-url",
  } as unknown as EuphoniumProps;

  (useEuphonium as jest.Mock).mockReturnValue({
    euphoniums: jest.fn(),
    deleteEuphonium: jest.fn(),
  });

  (useUsers as jest.Mock).mockReturnValue({
    users: jest.fn(),
  });

  beforeEach(async () => {
    (useEuphonium as jest.Mock).mockReturnValue({
      euphoniums: [{ id: "1", creator: { id: "1" } }, { id: "2" }],
      deleteEuphonium: jest.fn(),
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
        const elements = screen.getAllByRole("button");
        await userEvent.click(elements[0]);
        expect(elements[0]).toBeInTheDocument();
      });
    });

    describe("When click the second Link", () => {
      test("Then it should delete the item", async () => {
        const elements = screen.getAllByRole("button");
        await userEvent.click(elements[1]);
        expect(elements[1]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).deleteEuphonium
        ).toHaveBeenCalled();
      });
    });
  });
});
