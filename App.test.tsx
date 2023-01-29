import React from "react"
import renderer from "@types/react-test-renderer"

import App from "./App"

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})