/* eslint-disable testing-library/no-unnecessary-act */
/*eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockComponent } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { euphoniumReducer } from "../reducer/euphonium.reducer";
import { EuphoniumRepo } from "../services/repository/euphonium.repo";
import { useEuphonium } from "./use.euphonium.hook";

describe("Given the useEuphonium hook", () => {
  let elements: HTMLElement[];

  const mockStore = configureStore({
    reducer: { euphoniums: euphoniumReducer },
    preloadedState: {
      euphoniums: [
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

  const mockRepo: EuphoniumRepo = {
    url: "",
    loadEuphoniums: jest.fn(),
    getEuphonium: jest.fn(),
    deleteEuphonium: jest.fn(),
    createEuphonium: jest.fn(),
    updateEuphonium: jest.fn(),
  };
  beforeEach(async () => {
    const TestComponent = function () {
      const {
        euphoniums,
        loadEuphoniums,
        loadOneBombardino,
        deleteEuphonium,
        addEuphonium,
        updateEuphonium,
      } = useEuphonium(mockRepo);
      return (
        <div>
          <button onClick={() => loadEuphoniums()}></button>
          <button onClick={() => loadOneBombardino("1")}></button>
          <button onClick={() => deleteEuphonium("1")}></button>
          <button onClick={() => deleteEuphonium("id-not-found")}></button>
          <button onClick={() => addEuphonium(euphoniums[0])}></button>
          <button onClick={() => updateEuphonium(euphoniums[0])}></button>
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
    test("Then it should call the repo method loadEuphoniums", async () => {
      await fireEvent.click(elements[0]);
      expect(mockRepo.loadEuphoniums).toHaveBeenCalled();
    });
  });

  describe("When click on second button", () => {
    test("Then it should call the repo method loadOneBombardino", async () => {
      const loadOneBombardino = await fireEvent.click(elements[1]);
      expect(mockRepo.getEuphonium).toHaveBeenCalled();
      expect(loadOneBombardino).toEqual(true);
    });
  });

  describe("When click on third button", () => {
    test("Then it should call the repo method deleteEuphonium", async () => {
      const deleteEuphonium = await fireEvent.click(elements[2]);
      expect(mockRepo.deleteEuphonium).toHaveBeenCalled();
      expect(deleteEuphonium).toEqual(true);
    });
  });
  describe("When click on fourth button", () => {
    test("Then it should call the repo method deleteEuphonium and fail because no id found", async () => {
      (mockRepo.deleteEuphonium as jest.Mock).mockRejectedValue("error");
      await act(async () => fireEvent.click(elements[3]));
      expect(mockRepo.deleteEuphonium).toHaveBeenCalled();
    });
  });

  describe("When click on fifth button", () => {
    test("Then it should call the repo method addEuphonium", async () => {
      const addEuphonium = await fireEvent.click(elements[4]);
      expect(mockRepo.createEuphonium).toHaveBeenCalled();
      expect(addEuphonium).toEqual(true);
    });
    test("Then it should throw error if fails", async () => {
      (mockRepo.createEuphonium as jest.Mock).mockRejectedValue("error");
      await act(async () => fireEvent.click(elements[4]));
      expect(mockRepo.createEuphonium).toHaveBeenCalled();
    });
  });
  describe("When click on sixth button", () => {
    test("Then it should call the repo method updateEuphonium", async () => {
      const updateEuphonium = await fireEvent.click(elements[5]);
      expect(mockRepo.updateEuphonium).toHaveBeenCalled();
      expect(updateEuphonium).toEqual(true);
    });
    test("Then it should throw error if fails", async () => {
      (mockRepo.updateEuphonium as jest.Mock).mockRejectedValue("error");
      await act(async () => fireEvent.click(elements[5]));
      expect(mockRepo.updateEuphonium).toHaveBeenCalled();
    });
  });
});
