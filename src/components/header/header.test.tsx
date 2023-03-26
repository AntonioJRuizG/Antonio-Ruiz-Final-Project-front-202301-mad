import { render, screen } from "@testing-library/react";
import { Header } from "./header";

jest.mock("../menu/menu");
describe("Given Header", () => {
  describe("When it is render", () => {
    test("Then it should be called", async () => {
      render(
        <Header>
          <></>
        </Header>
      );
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
