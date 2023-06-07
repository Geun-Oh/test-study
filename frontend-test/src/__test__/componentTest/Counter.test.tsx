import { render, screen } from "@testing-library/react";
import Counter from "../../Components/Counter";
import React from "react";
import "@testing-library/jest-dom";
import context from "jest-plugin-context";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("Counter Test", () => {
  it("2023이라는 텍스트를 보여주는 span 요소가 존재한다.", () => {
    render(<Counter />);
    const spanEl = screen.getByRole("span");
    expect(spanEl).toHaveTextContent("2023");
  });

  context("+버튼을 누르게 되면", () => {
    it("span 요소의 값이 2024가 된다.", async () => {
      render(<Counter />);
      const spanEl = screen.getByRole("span");
      const plusBtnEl = screen.getByRole("button", { name: "+" });
      await user.click(plusBtnEl);
      expect(spanEl).toHaveTextContent("2024");
    });
  });

  context("-버튼을 누르게 되면", () => {
    it("span 요소의 값이 2022가 된다.", async () => {
      render(<Counter />);
      const spanEl = screen.getByRole("span");
      const minusBtnEl = screen.getByRole("button", { name: "-" });
      await user.click(minusBtnEl);
      expect(spanEl).toHaveTextContent("2022");
    });
  });
});
