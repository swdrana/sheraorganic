"use client";
import { useEffect, useRef, useState } from "react";
import { loadStylesheet } from "@/app/utils/loadStylesheet";

const MODULES = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};
const FORMATS = ["bold", "italic", "underline", "font", "list", "bullet", "align", "link", "image"];

// Quill 1.3's HTML importer throws "IndexSizeError: splitText" on some saved descriptions.
// react-quill re-imported the HTML inside React's commit (e.g. when the drawer re-appeared), so the
// error blanked the admin page ("Edit Product" white screen). We drive Quill directly instead and
// fall back to letting Quill parse the DOM when the importer fails.
const loadHtml = (editor, html) => {
  try {
    editor.clipboard.dangerouslyPasteHTML(0, html, "silent");
  } catch (error) {
    console.warn("Quill could not import description HTML; using DOM fallback", error);
    editor.setContents([], "silent");
    editor.root.innerHTML = html;
    editor.update("silent");
  }
};

// Uncontrolled editor: created once per mount (remount with a `key` to load another document).
const QuillEditor = ({ initialHtml, onChange }) => {
  const hostRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;
    import("quill").then(({ default: Quill }) => {
      if (cancelled || !host) return;
      host.innerHTML = "";
      const container = document.createElement("div");
      host.appendChild(container);
      const editor = new Quill(container, { theme: "snow", modules: MODULES, formats: FORMATS });
      if (initialHtml) loadHtml(editor, initialHtml);
      editor.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") onChangeRef.current(editor.root.innerHTML);
      });
    });
    return () => {
      cancelled = true;
      if (host) host.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={hostRef}
      className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 focus:ring-0 outline-none"
      style={{ height: "500px", overflowY: "auto" }}
    />
  );
};

const DescriptionInput = ({ productDetails, setProductDes }) => {
  useEffect(() => {
    loadStylesheet("/css/quill.snow.css");
  }, []);
  const productKey = productDetails?._id || "new";
  const initialDescription = productDetails?.description || "";
  const [value, setValue] = useState(initialDescription);

  // A different product was opened: start from its own description (an empty one must not
  // keep the previous product's text, which could then be saved onto the wrong product).
  useEffect(() => {
    setValue(initialDescription);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productKey]);

  // Update the external handler when the value changes
  useEffect(() => {
    setProductDes(value);
  }, [value, setProductDes]);

  return <QuillEditor key={productKey} initialHtml={initialDescription} onChange={setValue} />;
};

export default DescriptionInput;
