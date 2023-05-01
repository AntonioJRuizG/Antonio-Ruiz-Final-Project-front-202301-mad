/* eslint-disable testing-library/no-render-in-setup */
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { usePagination } from "./use.pagination";
import { paginationReducer } from "../../reducer/page.reducer/page.reducer";

describe("Given the usePagination hook", () => {
  let buttons: HTMLElement[];

  const mockStore = configureStore({
    reducer: { page: paginationReducer },
    preloadedState: {
      page: {
        currentPage: 1,
      },
    },
  });

  beforeEach(async () => {
    const TestComponent = function () {
      const { page, nextPage, restartPagination } = usePagination();

      return (
        <>
          <h1>{page.currentPage}</h1>
          <button onClick={() => nextPage()}></button>
          <button onClick={() => restartPagination()}></button>
        </>
      );
    };

    render(
      <Provider store={mockStore}>
        <TestComponent></TestComponent>
      </Provider>
    );

    buttons = await screen.findAllByRole("button");
  });

  describe("When TestComponent is rendered", () => {
    test("then a button should be in the document", async () => {
      expect(buttons[0]).toBeInTheDocument();
    });

    test("then a heading should be in the document with current page value", async () => {
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
      const currentPage = screen.getByText(1);
      expect(currentPage).toHaveTextContent("1");
    });
  });

  describe("When click on first button", () => {
    test("Then it should call the nextPage method", async () => {
      const setNextPage = await fireEvent.click(buttons[0]);
      expect(setNextPage).toBe(true);
    });
  });

  describe("When click on second button", () => {
    test("Then it should call the restartPagination method", async () => {
      const restartPage = await fireEvent.click(buttons[1]);
      expect(restartPage).toBe(true);
    });
  });
});
