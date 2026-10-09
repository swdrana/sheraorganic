import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import KeywordsInput from "./KeywordsInput";

const renderInput = (initial = []) => {
  const onSubmit = vi.fn((event) => event.preventDefault());
  const Wrapper = () => {
    const [value, setValue] = useState(initial);
    return (
      <form onSubmit={onSubmit}>
        <KeywordsInput value={value} onChange={setValue} />
        <output data-testid="keywords">{JSON.stringify(value)}</output>
      </form>
    );
  };
  render(<Wrapper />);
  return {
    input: screen.getByRole("textbox", { name: "SEO keywords / tags" }),
    keywords: () => JSON.parse(screen.getByTestId("keywords").textContent),
    onSubmit,
  };
};

describe("KeywordsInput", () => {
  it("adds a trimmed chip on an English comma", () => {
    const { input, keywords } = renderInput();
    fireEvent.change(input, { target: { value: "  organic   rice ," } });
    expect(keywords()).toEqual(["organic rice"]);
  });

  it("adds a chip on a Bengali comma", () => {
    const { input, keywords } = renderInput();
    fireEvent.change(input, { target: { value: "চাল،" } });
    expect(keywords()).toEqual(["চাল"]);
  });

  it("adds on Enter without submitting the form", () => {
    const { input, keywords, onSubmit } = renderInput();
    fireEvent.change(input, { target: { value: "brown rice" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(keywords()).toEqual(["brown rice"]);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("adds every keyword from a comma-separated paste", () => {
    const { input, keywords } = renderInput();
    fireEvent.paste(input, {
      clipboardData: { getData: () => "a, b, c" },
    });
    expect(keywords()).toEqual(["a", "b", "c"]);
  });

  it("ignores empty and case-insensitive duplicate keywords", () => {
    const { input, keywords } = renderInput(["Rice"]);
    fireEvent.paste(input, {
      clipboardData: { getData: () => "rice, , Oats, oats" },
    });
    expect(keywords()).toEqual(["Rice", "Oats"]);
  });

  it("removes the last chip with Backspace on an empty input", () => {
    const { input, keywords } = renderInput(["Rice", "Oats"]);
    fireEvent.keyDown(input, { key: "Backspace", code: "Backspace" });
    expect(keywords()).toEqual(["Rice"]);
  });

  it("adds leftover text on blur and removes chips with a button", () => {
    const { input, keywords } = renderInput();
    fireEvent.change(input, { target: { value: "  fresh   oats  " } });
    fireEvent.blur(input);
    expect(keywords()).toEqual(["fresh oats"]);
    const remove = screen.getByRole("button", { name: "Remove fresh oats" });
    expect(remove.getAttribute("type")).toBe("button");
    fireEvent.click(remove);
    expect(keywords()).toEqual([]);
  });

  it("limits keyword length and chip count", () => {
    const { input, keywords } = renderInput();
    fireEvent.paste(input, {
      clipboardData: { getData: () => ["x".repeat(70), ...Array.from({ length: 25 }, (_, index) => `tag${index}`)].join(",") },
    });
    expect(keywords()).toHaveLength(20);
    expect(keywords()[0]).toHaveLength(60);
  });
});
