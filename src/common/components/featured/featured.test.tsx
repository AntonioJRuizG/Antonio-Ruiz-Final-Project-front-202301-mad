/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";

import { Featured } from "./featured";
import { MemoryRouter } from "react-router-dom";

jest.mock("../menu/menu");
jest.mock("../../../features/user/components/current.user/current.user");

describe("Given Header", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter>
        <Featured></Featured>
      </MemoryRouter>
    );
  });

  describe("When it is render", () => {
    test("Then it should be called", async () => {
      const element = screen.getAllByRole("heading");
      expect(element[0]).toBeInTheDocument();
    });
  });
});
