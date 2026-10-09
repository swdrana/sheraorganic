"use client";
import React from "react";

// If a rich-text editor crashes (Quill can fail to import some saved HTML), show a plain HTML
// textarea instead of letting the error blank the whole admin page.
export default class EditorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("Rich-text editor crashed; falling back to plain HTML input", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const { value, onChange } = this.props;
    return (
      <div>
        <p className="text-sm text-red-500 mb-1">
          Editor could not load this content; editing as HTML.
        </p>
        <textarea
          className="w-full rounded-lg border border-gray-400 p-2 text-sm"
          rows={14}
          value={value || ""}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </div>
    );
  }
}
