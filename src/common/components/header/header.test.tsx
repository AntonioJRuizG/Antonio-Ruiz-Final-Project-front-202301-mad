/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";

import { Menu } from "../menu/menu";
import { Header } from "./header";
import { MemoryRouter } from "react-router-dom";
import { useUsers } from "../../../features/user/hook/use.user.hook";

jest.mock("../menu/menu");
jest.mock("../../../features/user/components/current.user/current.user");
jest.mock("../../../features/user/hook/use.user.hook");

describe("Given Header", () => {
  describe("When it renders with user", () => {
    beforeEach(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });
      render(
        <MemoryRouter>
          <Header></Header>
        </MemoryRouter>
      );
    });

    test("Then it should be called", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then it should be called Menu", async () => {
      expect(Menu).toHaveBeenCalled();
    });
  });

  describe("When it renders without user", () => {
    beforeEach(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {},
      });
      render(
        <MemoryRouter>
          <Header></Header>
        </MemoryRouter>
      );
    });

    test("Then it should be called", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then it should be called Menu", async () => {
      expect(Menu).toHaveBeenCalled();
    });
  });
});
