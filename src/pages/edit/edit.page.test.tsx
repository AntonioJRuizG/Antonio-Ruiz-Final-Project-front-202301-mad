import { render } from "@testing-library/react";
import { Form } from "../../common/components/form/form";
import EditPage from "./edit.page";

jest.mock("../../common/components/form/form");

describe("Given GalleryPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<EditPage></EditPage>);
      expect(Form).toHaveBeenCalled();
    });
  });
});
