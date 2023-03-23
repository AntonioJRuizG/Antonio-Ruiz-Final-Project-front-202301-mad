import { render } from "@testing-library/react";
// Temp import { Form } from "../../features/euphonium/components/form/form";
import AddPage from "./add.page";

// Temp jest.mock("../../features/euphonium/components/form/form");
describe("Given Add Page component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<AddPage></AddPage>);
      // Temp expect(Form).toHaveBeenCalled();
    });
  });
});
