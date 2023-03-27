/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import { Menu } from "../menu/menu";
import { Header } from "./header";

jest.mock("../menu/menu");
describe("Given Header", () => {
  beforeEach(async () => {
    await render(<Header></Header>);
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
