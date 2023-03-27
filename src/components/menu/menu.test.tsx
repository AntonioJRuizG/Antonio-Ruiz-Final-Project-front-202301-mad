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
    test("Then it should render the PublicMenu", async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {},
      });
      await render(<Menu></Menu>);
      expect(PublicMenu).toHaveBeenCalled();
    });
  });

  describe("When it renders and there is a logged user", () => {
    test("Then it should render the PrivateMenu", async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: { token: "token-test", user: { id: "1" } },
      });
      await render(<Menu></Menu>);
      expect(PrivateMenu).toHaveBeenCalled();
    });
  });
});
