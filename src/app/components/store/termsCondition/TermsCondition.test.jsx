import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TermsCondition from "./TermsCondition";

const fixture = vi.hoisted(() => ({ setting: { terms: { value: "" } }, settingLoading: false }));
vi.mock("../dataFetching/useSetting", () => ({ default: () => fixture }));
vi.mock("../common/others/PreLoader", () => ({ default: () => <p>Loading</p> }));
vi.mock("@/app/utils/loadStylesheet", () => ({ loadStylesheet: vi.fn() }));

describe("admin-authored terms", () => {
  it("renders the Quill HTML actually saved by the editor, including formatting, links and images", () => {
    fixture.setting.terms.value = '<p class="ql-align-center"><strong>দোকানের শর্ত</strong> <em>প্রযোজ্য</em> <u>লেখা</u></p><ol><li>প্রথম নিয়ম</li></ol><a href="https://example.com/terms">বিস্তারিত</a><img src="/img/example.png" alt="ছবি">';
    const { container } = render(<TermsCondition />);
    expect(screen.getByText("দোকানের শর্ত").tagName).toBe("STRONG");
    expect(screen.getByText("প্রযোজ্য").tagName).toBe("EM");
    expect(screen.getByText("লেখা").tagName).toBe("U");
    expect(container.querySelector(".ql-align-center")).not.toBeNull();
    expect(container.querySelector("ol li")).toHaveTextContent("প্রথম নিয়ম");
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com/terms");
    expect(screen.getByAltText("ছবি")).toHaveAttribute("src", "/img/example.png");
  });
  it("drops executable elements/attributes and unsafe URL schemes rather than injecting saved HTML", () => {
    fixture.setting.terms.value = '<script>alert(1)</script><iframe src="https://evil.example"></iframe><svg onload="alert(1)"><text>unsafe</text></svg><p onclick="alert(1)" style="color:red" class="evil ql-font-serif">নিরাপদ লেখা</p><a href="jav&#x61;script:alert(1)">লিংক</a><img src="javascript:alert(1)" onerror="alert(1)"><img src="data:image/svg+xml;base64,AAAA">';
    const { container } = render(<TermsCondition />);
    expect(screen.getByText("নিরাপদ লেখা")).toHaveClass("ql-font-serif");
    expect(container.querySelector("script, iframe, svg, img, [onclick], [onerror], [style], .evil")).toBeNull();
    expect(screen.getByText("লিংক")).not.toHaveAttribute("href");
    expect(container).not.toHaveTextContent("alert(1)");
  });
  it.each(["", "<p><br></p>", "<p>&nbsp;</p>", "<script>alert(1)</script>", undefined])("shows a neutral notice for empty or discarded terms: %s", (html) => {
    fixture.setting.terms.value = html;
    render(<TermsCondition />);
    expect(screen.getByText("শর্তাবলি এখনো প্রকাশ করা হয়নি।")).toBeInTheDocument();
    expect(screen.queryByText(/Grostore/i)).not.toBeInTheDocument();
  });
  it("renders plain text as text rather than assuming editor HTML is mandatory", () => {
    fixture.setting.terms.value = "সাধারণ নিয়ম ও শর্তাবলি";
    render(<TermsCondition />);
    expect(screen.getByText("সাধারণ নিয়ম ও শর্তাবলি")).toBeInTheDocument();
  });
});
