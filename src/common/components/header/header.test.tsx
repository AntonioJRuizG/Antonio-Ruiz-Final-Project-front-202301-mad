/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";

import { Menu } from "../menu/menu";
import { Header } from "./header";
import { MemoryRouter } from "react-router-dom";

jest.mock("../menu/menu");
jest.mock("../../../features/user/components/current.user/current.user");

describe("Given Header", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter>
        {" "}
        <Header></Header>
      </MemoryRouter>
    );
  });

  describe("When it is render", () => {
    test("Then it should be called", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then it should be called Menu", async () => {
      expect(Menu).toHaveBeenCalled();
    });
  });
});
