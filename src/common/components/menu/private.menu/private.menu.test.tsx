/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { MenuOptions } from "../../../../app/app";
import { store } from "../../../../store/store";
import { PrivateMenu } from "./private.menu";

describe("Given menu component", () => {
  describe("When it renders and no user is logged", () => {
    const mockOptions: MenuOptions[] = [
      {
        id: "2",
        label: "test",
        path: "/test",
      },
    ];
    beforeEach(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PrivateMenu menuOptionsPrivate={mockOptions}></PrivateMenu>
          </MemoryRouter>
        </Provider>
      );
    });

    test("Then it should render the PrivateMenu", async () => {
      const element = screen.getByText(mockOptions[0].label);
      expect(element).toBeInTheDocument();
    });
  });
});
