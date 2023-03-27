import { render } from "@testing-library/react";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { UserRepo } from "../../../features/user/services/repository/user.repo";
import { Menu } from "../menu";

jest.mock("../../../features/user/hook/use.user.hook");

const repoUserMock = {} as UserRepo;

describe("Given menu component", () => {
  describe("When it renders there is a user logged", () => {
    test("Then it should call logoutUser", () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
          token: "token-test",
        },
        logoutUser: jest.fn(),
      });
      render(<Menu></Menu>);
      expect(useUsers(repoUserMock).logoutUser).toHaveBeenCalled();
    });
  });
});
