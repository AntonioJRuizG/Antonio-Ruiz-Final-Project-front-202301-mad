import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./app";

describe("Given App component", () => {
  describe("When it is rendered", () => {
    test("renders learn react link", () => {
      render(<App></App>);
      const titleValue = screen.getByRole("heading");
      expect(titleValue).toBeInTheDocument();
      expect(titleValue).toHaveTextContent(/bombardino/i);
    });
  });
});
