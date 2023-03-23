import { render } from "@testing-library/react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import App from "./app";
import { AppRouter } from "../routes/app.router";
import { MemoryRouter as Router } from "react-router-dom";

jest.mock("../routes/app.router");

describe("Given App component", () => {
  describe("When it is rendered", () => {
    test("Then AppRouter should be called", () => {
      render(
        <Router>
          <Provider store={store}>
            <App></App>
          </Provider>
        </Router>
      );

      expect(AppRouter).toHaveBeenCalled();
    });
  });
});
