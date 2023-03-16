import { render } from "@testing-library/react";
import { App } from "./app";
import { RegisterForm } from "../../../features/user/components/register/register";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { LoginForm } from "../../../features/user/components/login/login";

jest.mock("../../../features/user/components/register/register");
jest.mock("../../../features/user/components/login/login");

describe("Given App component", () => {
  describe("When it is rendered", () => {
    test("renders learn react link", () => {
      render(
        <Provider store={store}>
          <App></App>
        </Provider>
      );

      expect(RegisterForm).toHaveBeenCalled();
      expect(LoginForm).toHaveBeenCalled();
    });
  });
});
