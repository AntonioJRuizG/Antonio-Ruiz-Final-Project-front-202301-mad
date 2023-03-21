/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { Add } from "./add";

jest.mock("../../../features/euphonium/hook/use.euphonium.hook", () => ({
  useEuphonium: () => ({
    euphoniums: [
      {
        id: "test-id",
        manufacturer: "Yamaha",
        alias: "YBH-301MS",
        image: "image-url",
        instrumentModel: "YBH-301MS",
        level: "Intermediate",
        valves: 3,
        marchingBand: true,
      },
    ],
    loadOneBombardino: jest.fn(() => ({
      id: "test-id",
      manufacturer: "Yamaha",
      alias: "YBH-301MS",
      image: "image-url",
      instrumentModel: "YBH-301MS",
      level: "Intermediate",
      valves: 3,
      marchingBand: true,
    })),
  }),
}));

describe("Given Add component", () => {
  const spyLog = jest.spyOn(console, "log");
  // Arrange
  let elements: HTMLElement[];
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Add></Add>
      </Provider>
    );
    elements = [
      screen.getByRole("heading"),
      ...screen.getAllByRole("textbox"),
      ...screen.getAllByRole("radio"),
      screen.getByRole("combobox"),
      screen.getByRole("button"),
    ];
  });

  describe("When it is render", () => {
    // Act

    test("Then it shoud be in the document", () => {
      console.log(elements);
      // Assert
      expect(elements[0]).toBeInTheDocument();
      expect(elements.length).toBe(9);
    });
  });

  describe("When the user type in the inputs", () => {
    test("Then text should be in the screen", async () => {
      const mockText = "test";
      await userEvent.type(elements[1], mockText);
      expect(elements[1]).toHaveValue(mockText);
      await userEvent.click(elements[6]);
      expect(elements[6]).toBeChecked();
    });
  });

  describe("When the user click in the button", () => {
    test("Then data should be in the console", () => {
      fireEvent.click(elements[8]);
      expect(spyLog).toHaveBeenCalled();
    });
  });
});
