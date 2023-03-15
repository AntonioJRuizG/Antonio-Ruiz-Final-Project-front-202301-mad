import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../../core/store/store";
import { RegisterForm } from "./register";

describe("Given Contact2 component", () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    await render(
      <Provider store={store}>
        <RegisterForm></RegisterForm>
      </Provider>
    );

    elements = [screen.getByRole("button"), ...screen.getAllByRole("textbox")];
  });

  describe("When it is render", () => {
    test("Then it shoud be in the document", () => {
      expect(elements[0]).toBeInTheDocument();
      expect(elements.length).toBe(3);
    });
  });

  describe("When the user type in the inputs", () => {
    test("Then text should be in the screen", () => {
      const mockUser = "";
      userEvent.type(elements[1], mockUser);
      expect(elements[1]).toHaveValue(mockUser);
    });
  });

  describe("When the user click in the button", () => {
    test("Then data should be in the console", async () => {
      fireEvent.click(elements[0]);
    });
  });
});
