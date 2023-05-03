/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MenuOptions } from "../../../app/app";
import { MenuList } from "./menu.list";

describe("Given menu component", () => {
  describe("When it renders and no user is logged", () => {
    const mockOptions: MenuOptions[] = [
      {
        id: "2",
        label: "test",
        path: "/test",
      },
    ];
    beforeEach(async () => {
      render(
        <MemoryRouter>
          <MenuList menuOptions={mockOptions}></MenuList>
        </MemoryRouter>
      );
    });

    test("Then it should render the PublicMenu", async () => {
      const element = screen.getByText(mockOptions[0].label);
      expect(element).toBeInTheDocument();
    });
  });
});
