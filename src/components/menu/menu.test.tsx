import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { MenuOptions } from "../../app/app";
import { Menu } from "./menu";

describe("Given menu component", () => {
  describe("When it is rendered", () => {
    test("Then it should render in the header component", () => {
      const mockOptions: MenuOptions[] = [
        {
          id: "2",
          label: "test",
          path: "/test",
        },
      ];
      render(
        <Router>
          <Menu menuOptions={mockOptions}></Menu>
        </Router>
      );
      const element = screen.getByText(mockOptions[0].label);
      expect(element).toBeInTheDocument();
    });
  });
});
