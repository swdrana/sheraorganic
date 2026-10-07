import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AttributeOptionTwo from "./AttributeOptionTwo";

vi.mock("react-multi-select-component", () => ({
  MultiSelect: ({ options, value, onChange }) => (
    <button
      type="button"
      data-testid="option-select"
      data-selected={value.length}
      onClick={() => onChange([options[0]])}
    >
      Select
    </button>
  ),
}));

const attribute = {
  _id: "color-id",
  variants: [{ _id: "red-id", name: "Red" }],
};

describe("AttributeOptionTwo", () => {
  beforeEach(() => vi.clearAllMocks());

  it("clears visible options when the parent values are cleared", () => {
    const Harness = () => {
      const [values, setValues] = useState({});
      return (
        <>
          <AttributeOptionTwo
            attributes={attribute}
            values={values}
            setValues={setValues}
          />
          <button type="button" onClick={() => setValues({})}>
            Clear
          </button>
        </>
      );
    };
    render(<Harness />);

    fireEvent.click(screen.getByTestId("option-select"));
    expect(screen.getByTestId("option-select")).toHaveAttribute(
      "data-selected",
      "1"
    );

    fireEvent.click(screen.getByText("Clear"));

    expect(screen.getByTestId("option-select")).toHaveAttribute(
      "data-selected",
      "0"
    );
  });

  it("hydrates visible options from parent values", () => {
    render(
      <AttributeOptionTwo
        attributes={attribute}
        values={{ "color-id": ["red-id"] }}
        setValues={vi.fn()}
      />
    );

    expect(screen.getByTestId("option-select")).toHaveAttribute(
      "data-selected",
      "1"
    );
  });
});
