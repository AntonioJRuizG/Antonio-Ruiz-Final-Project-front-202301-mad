/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { AppRouter } from "./app.router";
import "@testing-library/jest-dom";
import { MenuOptions } from "../app/app";

jest.mock("../features/euphonium/components/gallery/gallery");
jest.mock("../features/user/components/login/login");
jest.mock("../features/user/components/register/register");
jest.mock("../pages/add/add.page");

const pathsEntries = ["/", "/add", "/register", "/login"];

describe("Given AppRouter component", () => {
  describe("When it is reder and the path is '/'", () => {
    test("Then the gallery apge should be in the screen", async () => {
      await act(async () => {
        await render(
          <Router initialEntries={pathsEntries} initialIndex={0}>
            <AppRouter></AppRouter>
          </Router>
        );
      });

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is reder and the path is '/register'", () => {
    test("Then the register form should be in the screen", async () => {
      await act(async () => {
        await render(
          <Router initialEntries={pathsEntries} initialIndex={1}>
            <AppRouter></AppRouter>
          </Router>
        );
      });

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is reder and the path is '/add'", () => {
    test("Then the add form should be in the screen", async () => {
      await act(async () => {
        await render(
          <Router initialEntries={pathsEntries} initialIndex={2}>
            <AppRouter></AppRouter>
          </Router>
        );
      });

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is render and the path is '/login'", () => {
    test("Then the login form should be in the screen", async () => {
      await act(async () => {
        await render(
          <Router initialEntries={pathsEntries} initialIndex={3}>
            <AppRouter></AppRouter>
          </Router>
        );
      });

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });
});
