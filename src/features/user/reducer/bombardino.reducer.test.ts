import { bombardinoReducer } from "./bombardino.reducer";
import * as ac from "./bombardino.action.creator";

describe("Given bombardinosReducer", () => {
  const bombardino1 = {
    id: "1",
    alias: "test",
    manufacturer: "test",
    instrumentModel: "test",
    valves: 3,
    level: "test",
    marchingBand: true,
    image: "test",
    creator: { name: "test-1" },
  };

  const bombardino2 = {
    id: "2",
    alias: "test",
    manufacturer: "test",
    instrumentModel: "test",
    valves: 4,
    level: "test",
    marchingBand: true,
    image: "test",
    creator: { name: "test-2" },
  };

  const bombardinos = [bombardino1, bombardino2];

  describe("When it is called", () => {
    test("Then it should return the initial state", () => {
      return expect(
        bombardinoReducer(undefined, {
          type: undefined,
        })
      ).toEqual([]);
    });

    test("Then it should handle loadCreator and load bombardinos", () => {
      expect(bombardinoReducer([], ac.loadCreator(bombardinos))).toEqual(
        bombardinos
      );
    });

    test("Then it should handle addCreator and add bombardino2", () => {
      expect(
        bombardinoReducer([bombardino1], ac.addCreator(bombardino2))
      ).toEqual(bombardinos);
    });

    test("Then it should handle updateCreator", () => {
      const updatedbombardino2 = {
        ...bombardino2,
        alias: "test-updated",
      };
      const updatedbombardinos = [bombardino1, updatedbombardino2];
      expect(
        bombardinoReducer(bombardinos, ac.updateCreator(updatedbombardino2))
      ).toEqual(updatedbombardinos);
    });

    test("Then it should handle deleteCreator and delete bombardino 1", () => {
      expect(
        bombardinoReducer(bombardinos, ac.deleteCreator(bombardino1.id))
      ).toEqual([bombardino2]);
    });
  });
});
