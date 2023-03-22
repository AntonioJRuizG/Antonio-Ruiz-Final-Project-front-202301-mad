import { render } from "@testing-library/react";
import { Form } from "../../common/components/form/form";
import AddPage from "./add.page";

jest.mock("../../common/components/form/form");
describe("Given Add Page component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<AddPage></AddPage>);
      expect(Form).toHaveBeenCalled();
    });
  });
});
