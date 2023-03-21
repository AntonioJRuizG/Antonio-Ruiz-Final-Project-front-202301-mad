import { EuphoniumRepo } from "./euphonium.repo";

describe("Given EuphoniumRepo", () => {
  let euphoniumMockRepo: EuphoniumRepo;

  beforeEach(() => {
    euphoniumMockRepo = new EuphoniumRepo();
  });

  describe("When loadEuphoniums method is called", () => {
    test("Then it should fetch and return de euphoniums list", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.loadEuphoniums();
      expect(result).toEqual({ alias: "test" });
    });

    test("Then it should throw error fetch returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = euphoniumMockRepo.loadEuphoniums();
      await expect(result).rejects.toThrow();
    });
  });

  describe("When getEuphonium method is called", () => {
    test("Then it should fetch and return de euphoniums with the given id", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.getEuphonium("1");
      expect(result).toEqual({ id: "1", alias: "test" });
    });

    test("Then it should throw an error if it returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = euphoniumMockRepo.getEuphonium("1");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When deleteEuphonium method is called with an item id", () => {
    test("Then it should fetch with DELETE method", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.deleteEuphonium("1");
      expect(result).toEqual(undefined);
    });

    test("Then it should throw an error if fetch fails", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({}),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer testToken",
        },
      });
      const result = euphoniumMockRepo.deleteEuphonium("1");
      await expect(result).rejects.toThrow();
    });
    test("Then data is added into local storage", () => {
      localStorage.setItem("mockToken", "test-token");
      expect(localStorage.getItem("mockToken")).toEqual("test-token");
    });
    test("Then token should be '' if there is no token in localStorage", () => {
      const mockNullToken = null;
      localStorage.setItem("mockToken", mockNullToken!);
      expect(localStorage.getItem("mockToken")).toEqual("null");
    });
  });

  describe("When createEuphonium method is called", () => {
    test("Then it should fetch and create a new euphonium", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.createEuphonium({ alias: "test" });
      expect(result).toEqual({ id: "1", alias: "test" });
    });
  });

  describe("When updateEuphonium method is called", () => {
    test("Then it should fetch and return de updated euphonium", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test-2",
        }),
      });
      const result = await euphoniumMockRepo.updateEuphonium({
        id: "1",
        alias: "test-2",
      });
      expect(result).toEqual({ id: "1", alias: "test-2" });
    });
  });
});
