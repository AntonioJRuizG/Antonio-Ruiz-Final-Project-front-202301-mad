import { render } from "@testing-library/react";
import { useUsers } from "../../features/user/hook/use.user.hook";
import { Menu } from "./menu";
import { PrivateMenu } from "./private.menu/private.menu";
import { PublicMenu } from "./public.menu/public.menu";

jest.mock("./public.menu/public.menu");
jest.mock("./private.menu/private.menu");
jest.mock("../../features/user/hook/use.user.hook");

describe("Given menu component", () => {
  describe("When it renders and no user is logged", () => {
    (useUsers as jest.Mock).mockReturnValue({
      user: {},
    });
    render(<Menu></Menu>);
    test("Then it should render the PublicMenu", () => {
      expect(PublicMenu).toHaveBeenCalled();
    });
  });

  describe("When it renders and there is a logged user", () => {
    (useUsers as jest.Mock).mockReturnValue({
      user: {
        user: { id: "1" },
        token: "token-test",
      },
    });
    render(<Menu></Menu>);
    test("Then it should render the PrivateMenu", () => {
      expect(PrivateMenu).toHaveBeenCalled();
    });
  });
});
