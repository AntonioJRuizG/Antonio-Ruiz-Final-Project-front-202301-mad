/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MenuOptions } from "../../../app/app";
import { PublicMenu } from "./public.menu";

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
          <PublicMenu menuOptionsPublic={mockOptions}></PublicMenu>
        </MemoryRouter>
      );
    });

    test("Then it should render the PublicMenu", async () => {
      const element = screen.getByText(mockOptions[0].label);
      expect(element).toBeInTheDocument();
    });
  });
});
