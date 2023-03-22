import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { MenuOptions } from "../../../app/app";
import { Navbar } from "./navbar";

describe("Given Navbar component", () => {
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
          <Navbar menuOptions={mockOptions}></Navbar>
        </Router>
      );
      const element = screen.getByText(mockOptions[0].label);
      expect(element).toBeInTheDocument();
    });
  });
});
