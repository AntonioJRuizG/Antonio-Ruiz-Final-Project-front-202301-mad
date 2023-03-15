import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ProtoUserStructure } from "../model/user.model";
import { userReducer } from "../reducer/user.reducer";
import { UserRepo } from "../services/repository/user.repo";
import { useUsers } from "./use.user.hook";

describe("Given the useCharacters hook", () => {
  let elements: HTMLElement[];
  let mockRepo: UserRepo;
  const mockStore = configureStore({
    reducer: { users: userReducer },
    preloadedState: {
      users: [
        {
          id: "1",
          name: "Test",
          email: "test",
          passwd: "test",
        },
        {
          id: "2",
          name: "Test2",
          email: "test2",
          passwd: "test2",
        },
      ],
    },
  });

  beforeEach(async () => {
    const mockRepo: UserRepo = {
      url: "",
      loginUser: jest.fn(),
      registerUser: jest.fn(),
    };

    const TestComponent = function () {
      const { logUser, regUser } = useUsers(mockRepo);

      return (
        <div>
          <button onClick={() => logUser({} as ProtoUserStructure)}></button>
          <button onClick={() => regUser({} as ProtoUserStructure)}></button>
        </div>
      );
    };

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      await render(
        <Provider store={mockStore}>
          <TestComponent></TestComponent>
        </Provider>
      );
    });

    elements = await screen.findAllByRole("button");
  });

  describe("When click on first button", () => {
    test("Then it should call the repo method readOne", async () => {
      fireEvent.click(elements[0]);
      await expect(mockRepo.loginUser).toHaveBeenCalled();
    });
  });

  describe("When click on second button", () => {
    test("Then it should call the repo method readOne", async () => {
      fireEvent.click(elements[1]);
      await expect(mockRepo.registerUser).toHaveBeenCalled();
    });
  });
});
