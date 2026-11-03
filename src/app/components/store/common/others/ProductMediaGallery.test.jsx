import React from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import postcss from "postcss";
import { act, render } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import ProductMediaGallery from "./ProductMediaGallery";

vi.stubGlobal("React", React);
vi.mock("next/dynamic", () => ({ default: () => () => <div data-testid="video-player" /> }));

let stylesheet;
beforeAll(() => {
  // Give the real Swiper a viewport: jsdom has no layout engine.
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(375);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(375);
  vi.stubGlobal("matchMedia", (query) => ({ matches: false, media: query, addListener() {}, removeListener() {} }));
  stylesheet = document.createElement("style");
  const css = readFileSync(path.join(process.cwd(), "src/assets/css/main.css"), "utf8");
  // Use the shipped thumbnail rules, including their actual selectors/colors.
  postcss.parse(css).walkRules((rule) => {
    if (rule.selector.includes(".product-thumb-single")) stylesheet.textContent += rule.toString();
  });
  document.head.appendChild(stylesheet);
});

afterAll(() => {
  stylesheet.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("quick-view thumbnail selection", () => {
  it("highlights only the shown media when the thumbnail strip's active slide differs", () => {
    const { container } = render(<ProductMediaGallery product={{
      name: "Camera", image: ["/first.jpg", "/second.jpg", "/third.jpg"], videoUrl: "https://example.com/video.mp4",
    }} />);
    const main = container.querySelector(".quickview-product-slider .swiper").swiper;
    const thumbnails = [...container.querySelectorAll(".product-thumb-single")];
    const selectedColor = getComputedStyle(thumbnails[0]).borderColor;
    const unselectedColor = getComputedStyle(thumbnails[1]).borderColor;
    expect(selectedColor).not.toBe(unselectedColor);

    // Swiping the main gallery onto the video must move the visible selection.
    act(() => main.slideTo(1, 0));
    expect(thumbnails[1]).toHaveClass("swiper-slide-thumb-active");
    expect(thumbnails[0]).toHaveClass("swiper-slide-active");
    expect(getComputedStyle(thumbnails[1]).borderColor).toBe(selectedColor);
    expect(getComputedStyle(thumbnails[0]).borderColor).toBe(unselectedColor);

    // The real Thumbs tap handler must also select the requested main slide.
    const strip = container.querySelector(".product-thumbnail-slider .swiper").swiper;
    act(() => {
      strip.clickedIndex = 2;
      strip.clickedSlide = thumbnails[2];
      strip.emit("tap");
    });
    expect(main.activeIndex).toBe(2);
    expect(thumbnails[2]).toHaveClass("swiper-slide-thumb-active");
    expect(getComputedStyle(thumbnails[2]).borderColor).toBe(selectedColor);
    expect(getComputedStyle(thumbnails[1]).borderColor).toBe(unselectedColor);
    expect(container.querySelectorAll(".swiper-slide-duplicate")).toHaveLength(0);
  });
});
