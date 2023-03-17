import { BombardinoRepo } from "./bombardino.repo";

describe("Given BombardinoRepo", () => {
  let bombardinoRepo: BombardinoRepo;

  beforeEach(() => {
    bombardinoRepo = new BombardinoRepo();
  });

  describe("When loadBombardinos method is called", () => {
    test("Then it should make a GET request to the /bombardinos endpoint with the given bombardino data", async () => {
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
});
