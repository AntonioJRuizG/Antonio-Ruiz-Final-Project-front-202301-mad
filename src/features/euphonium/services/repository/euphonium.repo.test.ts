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
      });
      const result = euphoniumMockRepo.deleteEuphonium("1");
      await expect(result).rejects.toThrow();
    });
  });
});
