/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";

import { Intro } from "./intro";
import { MemoryRouter } from "react-router-dom";
import { useUsers } from "../../../features/user/hook/use.user.hook";

jest.mock("../../../features/user/hook/use.user.hook");
jest.mock("../../../features/user/components/current.user/current.user");

describe("Given Featured", () => {
  describe("When it renders with user", () => {
    beforeEach(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });
      render(
        <MemoryRouter>
          <Intro></Intro>
        </MemoryRouter>
      );
    });

    test("Then it should be called", async () => {
      const element = screen.getAllByRole("heading");
      expect(element[0]).toBeInTheDocument();
    });
  });

  describe("When it renders without user", () => {
    beforeEach(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {},
      });
      render(
        <MemoryRouter>
          <Intro></Intro>
        </MemoryRouter>
      );
    });

    test("Then it should be called without button", async () => {
      const element = screen.getAllByRole("heading");
      expect(element[0]).toBeInTheDocument();
    });
  });
});
