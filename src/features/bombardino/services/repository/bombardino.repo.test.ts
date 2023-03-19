import { BombardinoRepo } from "./bombardino.repo";

describe("Given BombardinoRepo", () => {
  let bombardinoRepo: BombardinoRepo;

  beforeEach(() => {
    bombardinoRepo = new BombardinoRepo();
  });

  describe("When loadBombardinos method is called", () => {
    test("Then it should fetch and return de bombardinos list", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          alias: "test",
        }),
      });
      const result = await bombardinoRepo.loadBombardinos();
      expect(result).toEqual({ alias: "test" });
    });

    test("Then it should throw error fetch returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = bombardinoRepo.loadBombardinos();
      await expect(result).rejects.toThrow();
    });
  });

  describe("When getBombardino method is called", () => {
    test("Then it should fetch and return de bombardino with the given id", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test",
        }),
      });
      const result = await bombardinoRepo.getBombardino("1");
      expect(result).toEqual({ id: "1", alias: "test" });
    });

    test("Then it should throw an error if it returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = bombardinoRepo.getBombardino("1");
      await expect(result).rejects.toThrow();
    });
  });
});
