import { render } from "@testing-library/react";
// Temp import { Form } from "../../features/euphonium/components/form/form";
import EditPage from "./edit.page";

// Temp jest.mock("../../features/euphonium/components/form/form");

describe("Given GalleryPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<EditPage></EditPage>);
      // Temp expect(Form).toHaveBeenCalled();
    });
  });
});
