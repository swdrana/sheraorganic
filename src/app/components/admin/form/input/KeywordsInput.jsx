"use client";

import React, { useState } from "react";

const normalizeKeyword = (keyword) =>
  keyword.trim().replace(/\s+/g, " ").slice(0, 60);

const KeywordsInput = ({ value = [], onChange }) => {
  const [draft, setDraft] = useState("");

  const addKeywords = (text) => {
    const keywords = [...value];
    const seen = new Set(keywords.map((keyword) => keyword.toLocaleLowerCase()));

    text.split(/[,،]/).forEach((part) => {
      const keyword = normalizeKeyword(part);
      const key = keyword.toLocaleLowerCase();
      if (keyword && !seen.has(key) && keywords.length < 20) {
        keywords.push(keyword);
        seen.add(key);
      }
    });

    if (keywords.length !== value.length) onChange(keywords);
  };

  const handleChange = (event) => {
    const text = event.target.value;
    if (/[,،]/.test(text)) {
      const parts = text.split(/[,،]/);
      addKeywords(parts.slice(0, -1).join(","));
      setDraft(parts.at(-1));
    } else {
      setDraft(text);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addKeywords(draft);
      setDraft("");
    } else if (event.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const handlePaste = (event) => {
    const text = event.clipboardData.getData("text");
    if (/[,،]/.test(text)) {
      event.preventDefault();
      addKeywords(`${draft}${text}`);
      setDraft("");
    }
  };

  return (
    <div className="flex min-h-[50px] flex-wrap items-center gap-2 rounded-lg border border-gray-400 bg-slate-500 bg-opacity-5 px-3 py-2">
      {value.map((keyword, index) => (
        <span key={`${keyword}-${index}`} className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-800">
          {keyword}
          <button
            type="button"
            aria-label={`Remove ${keyword}`}
            className="text-gray-600 hover:text-gray-900"
            onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        aria-label="SEO keywords / tags"
        className="min-w-[120px] flex-1 bg-transparent py-1 outline-none"
        placeholder={value.length ? "Add keyword" : "Type keywords, separated by commas"}
        value={draft}
        maxLength={60}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={() => {
          addKeywords(draft);
          setDraft("");
        }}
      />
    </div>
  );
};

export default KeywordsInput;
