"use client";

import { loadStylesheet } from "@/app/utils/loadStylesheet";
import React, { createElement, useEffect, useState } from "react";

// Quill stores HTML, not a Delta. Parse in an inert template, then rebuild ONLY these
// React elements/props. No saved HTML, event handler, style or unknown attribute reaches the DOM.
const TAGS = new Set(["p", "div", "span", "br", "strong", "b", "em", "i", "u", "s", "ol", "ul", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "a", "img"]);
const DROP = new Set(["script", "style", "iframe", "object", "embed", "svg", "math", "template", "noscript"]);
function safeUrl(raw, image = false) {
  const value = (raw || "").trim();
  if (!value || Array.from(value).some((char) => char.charCodeAt(0) <= 32 || char.charCodeAt(0) === 127) || value.startsWith("//")) return undefined;
  if (image && /^data:image\/(png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(value)) return value;
  try {
    const url = new URL(value, "https://local.invalid");
    return (image ? ["http:", "https:"] : ["http:", "https:", "mailto:", "tel:"]).includes(url.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
}
export function renderTermsHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = typeof html === "string" ? html : "";
  let hasContent = false;
  function render(node, key) {
    if (node.nodeType === 3) {
      if (node.textContent.trim()) hasContent = true;
      return node.textContent;
    }
    if (node.nodeType !== 1) return null;
    const tag = node.localName;
    if (DROP.has(tag)) return null;
    const children = Array.from(node.childNodes, (child, index) => render(child, `${key}-${index}`));
    if (!TAGS.has(tag)) return children;
    const props = { key };
    const classes = (node.getAttribute("class") || "").split(/\s+/).filter((name) => /^ql-(align-(center|right|justify)|font-(serif|monospace)|indent-[1-8])$/.test(name));
    if (classes.length) props.className = classes.join(" ");
    if (tag === "a") {
      props.href = safeUrl(node.getAttribute("href"));
      props.rel = "noopener noreferrer";
    }
    if (tag === "img") {
      props.src = safeUrl(node.getAttribute("src"), true);
      if (!props.src) return null;
      props.alt = node.getAttribute("alt") || "";
      props.style = { maxWidth: "100%", height: "auto" };
      hasContent = true;
    }
    return createElement(tag, props, ...(["img", "br"].includes(tag) ? [] : children));
  }
  const content = Array.from(template.content.childNodes, (node, index) => render(node, String(index)));
  return hasContent ? content : null;
}

export default function TermsContent({ html }) {
  const [content, setContent] = useState(null);
  useEffect(() => {
    loadStylesheet("/css/quill.snow.css");
    setContent(renderTermsHtml(html));
  }, [html]);
  return <div className="ql-editor">{content || <p>শর্তাবলি এখনো প্রকাশ করা হয়নি।</p>}</div>;
}
