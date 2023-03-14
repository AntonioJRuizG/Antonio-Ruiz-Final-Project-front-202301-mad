import { userReducer } from "./user.reducer";
import * as ac from "./user.action.creator";

describe("Given userReducer", () => {
  const user1 = {
    id: "1",
    name: "test1",
    email: "test1@test.com",
    passwd: "test1",
  };

  const user2 = {
    id: "2",
    name: "test2",
    email: "test2@test.com",
    passwd: "test2",
  };

  const users = [user1, user2];
  describe("When it is called", () => {
    test("Then it should return the initial state", () => {
      return expect(
        userReducer(undefined, {
          type: undefined,
        })
      ).toEqual([]);
    });

    test("Then it should handle loadCreator and load users", () => {
      expect(userReducer([], ac.loadCreator(users))).toEqual(users);
    });

    test("Then it should handle addCreator and add an user", () => {
      expect(userReducer([user1], ac.addCreator(user2))).toEqual(users);
    });

    test("Then it should handle updateCreator and update an user", () => {
      const updatedUser2 = {
        ...user2,
        name: "Jane Doe",
      };
      const updatedUsers = [user1, updatedUser2];
      expect(userReducer(users, ac.updateCreator(updatedUser2))).toEqual(
        updatedUsers
      );
    });

    test("Then it should handle deleteCreator", () => {
      expect(userReducer(users, ac.deleteCreator(user1.id))).toEqual([user2]);
    });
  });
});
