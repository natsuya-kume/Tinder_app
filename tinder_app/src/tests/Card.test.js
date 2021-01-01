import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "../Components/Card";

describe("Card component testing", () => {
  let container = null;
  container = document.createElement("div");
  document.body.appendChild(container);

  it("render", () => {
    // ケース別にテストします
    act(() => {
      render(<Card />, container);
    });
    // propsが渡されない場合
    expect(container.textContent).toBe("No contents");

    act(() => {
      render(<Card text="this card" />, container);
    });
    // propsが渡された場合
    expect(container.textContent).toBe("It's working fine");
  });
});
