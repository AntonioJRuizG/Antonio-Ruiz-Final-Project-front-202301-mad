import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../../store/store";
import { Gallery } from "./gallery";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockEuphoniums = [
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

// jest.mock("../../../features/euphonium/hook/use.euphonium.hook");

describe("Given Gallery", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Gallery></Gallery>
        </Provider>
      </MemoryRouter>
    );
  });

  describe("When it is render", () => {
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

    /* test("Then it should be buttons", async () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    }); */
  });
});
