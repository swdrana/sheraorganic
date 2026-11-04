"use client";

import { useDecorTheme } from "./DecorThemeProvider";
import { DECOR_SETS, getDecorSrc } from "./decorSets";

const cssWidth = (width) => /^\d+(\.\d+)?$/.test(String(width)) ? `${width}px` : width;

// Keep the grocery img's attributes and its position among siblings unchanged.
// Tech art occupies the original image box; removing absolute art cannot move content.
export default function Decor({ slot, reserveSpace = false, ...props }) {
  const theme = useDecorTheme();
  const src = getDecorSrc(theme, slot);
  const decor = DECOR_SETS[slot];
  if (!src) {
    return reserveSpace && decor ? (
      <span
        aria-hidden="true"
        className={props.className}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          width: cssWidth(props.width || decor.width),
          maxWidth: "100%",
          aspectRatio: `${decor.width} / ${decor.height}`,
          ...props.style,
        }}
      />
    ) : null;
  }

  if (theme === "grocery" || src === decor.grocery) {
    return <img src={src} {...props} />;
  }

  return (
    <img
      {...props}
      src={src}
      alt=""
      aria-hidden="true"
      style={{
        ...props.style,
        width: cssWidth(decor.techWidth || props.width || decor.width),
        height: "auto",
        aspectRatio: `${decor.width} / ${decor.height}`,
        objectFit: "contain",
      }}
    />
  );
}
