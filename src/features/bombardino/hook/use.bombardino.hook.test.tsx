/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
  };
  beforeEach(async () => {
    const TestComponent = function () {
      const { loadBombardinos } = useBombardino(mockRepo);
      return (
        <div>
          <button onClick={() => loadBombardinos()}></button>
          <button></button>
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
    test("Then it should call the repo method registerUser", async () => {
      await fireEvent.click(elements[0]);
      expect(mockRepo.loadBombardinos).toHaveBeenCalled();
    });
  });
});
