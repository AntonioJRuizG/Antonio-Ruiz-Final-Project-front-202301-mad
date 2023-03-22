import { render } from "@testing-library/react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import App from "./app";
import { AppRouter } from "../routes/app.router";

jest.mock("../router/app.router/app.router");

describe("Given App component", () => {
  describe("When it is rendered", () => {
    test("renders learn react link", () => {
      render(
        <Provider store={store}>
          <App></App>
        </Provider>
      );

      expect(AppRouter).toHaveBeenCalled();
    });
  });
});
