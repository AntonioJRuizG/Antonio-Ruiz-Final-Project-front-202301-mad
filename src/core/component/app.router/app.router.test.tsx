import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { MenuOptions } from "../app/app";
import { AppRouter } from "./app.router";
import "@testing-library/jest-dom";

jest.mock("../../../features/user/components/login/login");
jest.mock("../../../features/user/components/register/register");

describe("Given AppRouter component", () => {
  const mockOptions: MenuOptions[] = [
    { label: "Register", path: "/" },
    { label: "Login", path: "/login" },
  ];

  describe("When it is reder and the path is '/'", () => {
    test("Then the register form should be in the screen", async () => {
      render(
        <Router initialEntries={["/", "/login"]} initialIndex={0}>
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("heading", {
        name: "Register",
      });
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is render and the path is '/login'", () => {
    test("Then the login form should be in the screen", async () => {
      render(
        <Router initialEntries={["/", "/login"]} initialIndex={1}>
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("heading", {
        name: "Register",
      });
      expect(element).toBeInTheDocument();
    });
  });
});
