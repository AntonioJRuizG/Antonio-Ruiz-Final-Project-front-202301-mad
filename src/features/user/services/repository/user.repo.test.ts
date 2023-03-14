import { ProtoUserStructure, UserStructure } from "../../model/user.model";
import { UserRepo } from "./user.repo";

describe("Given UserRepo", () => {
  let userRepo: UserRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
  });

  describe("When registerUser method is called", () => {
    test("Then it should make a POST request to the /register endpoint with the given user data", async () => {
      const user: ProtoUserStructure = {
        email: "test@test.com",
        name: "testname",
        passwd: "1234",
      };
      const expectedUser: UserStructure = {
        id: "1",
        email: "test@test.com",
        name: "testname",
        passwd: "1234",
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
        json: () => Promise.resolve(expectedUser),
      } as Response);

      const result = await userRepo.registerUser(user);

      expect(fetchSpy).toHaveBeenCalled();
      expect(fetchSpy).toHaveBeenCalledWith(`${userRepo.url}/register`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      expect(result).toEqual(expectedUser);

      fetchSpy.mockRestore();
    });
  });

  describe("When loginUser method is called", () => {
    it("Then it should make a POST request to the /login endpoint with the given user data (with empty name field)", async () => {
      const user: ProtoUserStructure = {
        name: "",
        email: "test@test.com",
        passwd: "1234",
      };
      const expectedUser: UserStructure = {
        id: "1",
        email: "test@test.com",
        name: "",
        passwd: "1234",
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
        json: () => Promise.resolve(expectedUser),
      } as Response);

      const result = await userRepo.loginUser(user);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(`${userRepo.url}/login`, {
        method: "POST",
        body: JSON.stringify({ ...user, name: "" }),
      });
      expect(result).toEqual(expectedUser);

      fetchSpy.mockRestore();
    });
  });
});
