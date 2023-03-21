import { render } from "@testing-library/react";
import { Add } from "../../common/components/add/add";
import AddPage from "./add.page";

jest.mock("../../common/components/add/add");

describe("Given GalleryPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<AddPage></AddPage>);
      expect(Add).toHaveBeenCalled();
    });
  });
});
