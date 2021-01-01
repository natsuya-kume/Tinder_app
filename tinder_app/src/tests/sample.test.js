import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

it("UI test", () => {
  const component = renderer.create(<App />);
  expect(component).toMatchSnapshot();
});
