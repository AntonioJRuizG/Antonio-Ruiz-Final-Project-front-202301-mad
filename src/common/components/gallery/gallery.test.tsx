import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { Gallery } from "./gallery";

const mockBombardinos = [
  {
    id: "1",
    manufacturer: "Mock Manufacturer",
    alias: "Mock Alias",
    image: "mock-image-url",
  },
  {
    id: "2",
    manufacturer: "Another Mock Manufacturer",
    alias: "Another Mock Alias",
    image: "another-mock-image-url",
  },
];

jest.mock("../../../features/bombardino/hook/use.bombardino.hook", () => ({
  useBombardino: () => ({
    bombardinos: mockBombardinos,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest
    .fn()
    .mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("Given Gallery", () => {
  describe("When it is render", () => {
    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <Provider store={store}>
          <Gallery></Gallery>
        </Provider>
      );
    });

    test("Then it should be called", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then it should list items", async () => {
      const elementNumbers = screen.getAllByRole("list");
      for (let value of elementNumbers) {
        expect(value).toBeTruthy();
      }
    });
  });
});
