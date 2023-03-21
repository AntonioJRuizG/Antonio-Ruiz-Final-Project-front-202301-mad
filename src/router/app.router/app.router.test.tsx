import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { AppRouter } from "./app.router";
import "@testing-library/jest-dom";
import { MenuOptions } from "../../app/app";

jest.mock("../../common/components/gallery/gallery");
jest.mock("../../features/user/components/login/login");
jest.mock("../../features/user/components/register/register");
jest.mock("../../pages/add/add.page");

const pathsEntries = ["/", "/add", "/register", "/login"];

describe("Given AppRouter component", () => {
  const mockOptions: MenuOptions[] = [
    { label: "Gallery", path: "/" },
    { label: "Add", path: "/add" },
    { label: "Register", path: "register" },
    { label: "Login", path: "/login" },
  ];

  describe("When it is reder and the path is '/'", () => {
    test("Then the gallery apge should be in the screen", async () => {
      render(
        <Router initialEntries={pathsEntries} initialIndex={0}>
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is reder and the path is '/register'", () => {
    test("Then the register form should be in the screen", async () => {
      render(
        <Router initialEntries={pathsEntries} initialIndex={1}>
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is reder and the path is '/add'", () => {
    test("Then the add form should be in the screen", async () => {
      render(
        <Router initialEntries={pathsEntries} initialIndex={2}>
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is render and the path is '/login'", () => {
    test("Then the login form should be in the screen", async () => {
      render(
        <Router initialEntries={pathsEntries} initialIndex={3}>
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });
});
