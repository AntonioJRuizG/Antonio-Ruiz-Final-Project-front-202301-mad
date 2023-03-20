/* eslint-disable testing-library/no-unnecessary-act */
/*eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockComponent } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { bombardinoReducer } from "../reducer/bombardino.reducer";
import { BombardinoRepo } from "../services/repository/bombardino.repo";
import { useBombardino } from "./use.bombardino.hook";

describe("Given the useBombardino hook", () => {
  let elements: HTMLElement[];

  const mockStore = configureStore({
    reducer: { bombardinos: bombardinoReducer },
    preloadedState: {
      bombardinos: [
        {
          id: "1",
          alias: "test",
          manufacturer: "test",
          instrumentModel: "test",
          valves: 3,
          level: "test",
          marchingBand: true,
          image: "test",
          creator: { name: "Fabio" },
        },
        {
          id: "2",
          alias: "test-2",
          manufacturer: "test-2",
          instrumentModel: "test",
          valves: 3,
          level: "test",
          marchingBand: true,
          image: "test",
          creator: { name: "Fabio" },
        },
      ],
    },
  });

  const mockRepo: BombardinoRepo = {
    url: "",
    loadBombardinos: jest.fn(),
    getBombardino: jest.fn(),
    deleteBombardino: jest.fn(),
  };
  beforeEach(async () => {
    const TestComponent = function () {
      const { loadBombardinos, loadOneBombardino, deleteBombardino } =
        useBombardino(mockRepo);
      return (
        <div>
          <button onClick={() => loadBombardinos()}></button>
          <button onClick={() => loadOneBombardino("1")}></button>
          <button onClick={() => deleteBombardino("1")}></button>
          <button onClick={() => deleteBombardino("id-not-found")}></button>
        </div>
      );
    };

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <Provider store={mockStore}>
          <TestComponent></TestComponent>
        </Provider>
      );
    });

    elements = await screen.findAllByRole("button");
  });

  describe("When TestComponent is rendered", () => {
    test("then button should be in the document", async () => {
      const element = await screen.findAllByRole("button");
      expect(element[0]).toBeInTheDocument();
    });
  });

  describe("When click on first button", () => {
    test("Then it should call the repo method loadBombardinos", async () => {
      await fireEvent.click(elements[0]);
      expect(mockRepo.loadBombardinos).toHaveBeenCalled();
    });
  });

  describe("When click on second button", () => {
    test("Then it should call the repo method loadOneBombardino", async () => {
      const loadOneBombardino = await fireEvent.click(elements[1]);
      expect(mockRepo.getBombardino).toHaveBeenCalled();
      expect(loadOneBombardino).toEqual(true);
    });
  });

  describe("When click on third button", () => {
    test("Then it should call the repo method deleteBombardino", async () => {
      const deleteBombardino = await fireEvent.click(elements[2]);
      expect(mockRepo.deleteBombardino).toHaveBeenCalled();
      expect(deleteBombardino).toEqual(true);
    });
  });
  describe("When click on fourth button", () => {
    test("Then it should call the repo method deleteBombardino and fail because no id found", async () => {
      (mockRepo.deleteBombardino as jest.Mock).mockRejectedValue("error");
      await act(async () => fireEvent.click(elements[3]));
      expect(mockRepo.deleteBombardino).toHaveBeenCalled();
    });
  });
});
