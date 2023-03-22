import { render } from "@testing-library/react";
import { AddUpdateForm } from "../../common/components/form/addupd.form";
import EditPage from "./edit.page";

jest.mock("../../common/components/form/addupd.form");

describe("Given GalleryPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<EditPage></EditPage>);
      expect(AddUpdateForm).toHaveBeenCalled();
    });
  });
});
