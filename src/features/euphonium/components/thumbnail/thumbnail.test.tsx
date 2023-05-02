/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUsers } from "../../../user/hook/use.user.hook";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { Thumbnail } from "./thumbnail";
import { UserRepo } from "../../../user/services/repository/user.repo";
import { EuphoniumProps } from "../../model/euphonium.model";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../../user/services/repository/user.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");

describe("Given Thumbnail component", () => {
  let buttons: HTMLElement[];
  const mockEuphoniumRepo = {} as EuphoniumRepo;
  const mockUserRepo = {} as UserRepo;
  const mockEuphonium = { id: "1", creator: { id: "1" } } as EuphoniumProps;

  describe("When it renders", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [{ id: "1", creator: { id: "1" } }, { id: "2" }],
        deleteEuphonium: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });

      render(
        <Thumbnail
          item={mockEuphonium}
          deleteEuphonium={useEuphonium(mockEuphoniumRepo).deleteEuphonium}
          user={useUsers(mockUserRepo).user}
        ></Thumbnail>
      );

      buttons = screen.getAllByRole("button");
    });

    test("Then it should be in the document", async () => {
      expect(buttons[0]).toBeInTheDocument();
    });

    describe("When click the second Button", () => {
      test("Then it should call handleDelete", async () => {
        await act(async () => {
          await userEvent.click(buttons[1]);
        });

        expect(
          useEuphonium(mockEuphoniumRepo).deleteEuphonium
        ).toHaveBeenCalled();
      });
    });
  });
});
