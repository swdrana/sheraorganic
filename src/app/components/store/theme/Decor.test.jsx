import React from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, describe, expect, it, vi } from "vitest";
import { DECOR_THEMES } from "@/app/utils/theme";
import Breadcrumb from "../common/others/Breadcrumb";
import Decor from "./Decor";
import DecorThemeProvider from "./DecorThemeProvider";
import { DECOR_SETS, getDecorSrc, getWeeklyDealsImage } from "./decorSets";

vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());

function markup(theme, children) {
  return renderToStaticMarkup(<DecorThemeProvider theme={theme}>{children}</DecorThemeProvider>);
}

describe("server-rendered decoration", () => {
  it("preserves grocery img markup, classes and attributes exactly", () => {
    const props = {
      alt: "mango",
      className: "position-absolute mango z--1",
      width: "114",
      height: "114",
      style: { width: "114px", height: "114px" },
      loading: "lazy",
      "data-parallax": '{"y": -120}',
    };
    const expected = renderToStaticMarkup(<img src="/img/shapes/mango.png" {...props} />);
    expect(markup(undefined, <Decor slot="hero.mango" {...props} />)).toBe(expected);
    expect(markup("grocery", <Decor slot="hero.mango" {...props} />)).toBe(expected);
  });

  it("renders tech immediately on the server, without any grocery artwork", () => {
    const html = markup("tech", <Breadcrumb title="Products" page="Products" />);
    expect(html).toContain('/themes/tech/shapes/battery.svg');
    expect(html).toContain('/themes/tech/shapes/gamepad.svg');
    for (const food of ["pata-xs.svg", "onion.png", "garlic-white.png", "roll-1.png", "roll-2.webp", "tomato-half.svg", "cauliflower.png"]) {
      expect(html).not.toContain(`/img/shapes/${food}`);
    }
    expect(html).toContain('/img/shapes/frame-circle.svg');
    expect(html).toContain('/img/shapes/bg-shape-6.png');
  });

  it("none removes niche art and keeps neutral shapes plus the content container", () => {
    const html = markup("none", <Breadcrumb title="Products" />);
    expect((html.match(/<img /g) || [])).toHaveLength(2);
    expect(html).toContain('/img/shapes/frame-circle.svg');
    expect(html).toContain('/img/shapes/bg-shape-6.png');
    expect(html).toContain('class="container"');
    expect(html).toContain('Products');
  });

  it("retains the hero sizing circle and checkout's neutral circle in all themes", () => {
    for (const theme of DECOR_THEMES) {
      expect(getDecorSrc(theme, "hero-slide.hero-circle-lg")).toBeTruthy();
      expect(getDecorSrc(theme, "checkout.circle-half")).toBe("/img/shapes/circle-half.png");
    }
    expect(getDecorSrc("tech", "hero-slide.hero-circle-lg")).toBe("/themes/tech/shapes/hero-circle-lg.png");
  });

  it("reserves the original in-flow illustration box when none hides it", () => {
    const html = markup("none", <Decor slot="about-us.abut-us" className="img-fluid" reserveSpace />);
    expect(html).not.toContain('<img');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('aspect-ratio:590 / 551');
  });

  it("has local files for every selected asset and valid sizing boxes", () => {
    for (const decor of Object.values(DECOR_SETS)) {
      expect(decor.width).toBeGreaterThan(0);
      expect(decor.height).toBeGreaterThan(0);
      for (const theme of DECOR_THEMES) {
        if (decor[theme]) expect(existsSync(path.join(process.cwd(), "public", decor[theme]))).toBe(true);
      }
    }
    expect(getDecorSrc("tech", "unknown-slot")).toBeNull();
  });
});

describe("admin-configured weekly banner", () => {
  it("uses configured images for every theme, including none", () => {
    for (const theme of DECOR_THEMES) {
      expect(getWeeklyDealsImage(theme, " https://example.com/banner.jpg ")).toBe("https://example.com/banner.jpg");
    }
  });

  it("falls back to vegetables only on the grocery store", () => {
    for (const value of [undefined, null, "", " ", false]) {
      expect(getWeeklyDealsImage(undefined, value)).toBe("/img/banner/vegetables.webp");
      expect(getWeeklyDealsImage("tech", value)).toBeNull();
      expect(getWeeklyDealsImage("none", value)).toBeNull();
    }
  });
});
