"use client";

import { useEffect } from "react";

// Shown instead of a blank white page when a page crashes in the browser.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container py-5 text-center">
      <h2 className="h5 mb-3">কিছু একটা সমস্যা হয়েছে।</h2>
      <p className="text-muted mb-4">পেজটি আবার লোড করে দেখুন।</p>
      <button
        type="button"
        className="btn btn-primary me-2"
        onClick={() => reset()}
      >
        আবার চেষ্টা করুন
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => window.location.reload()}
      >
        পেজ রিলোড
      </button>
    </div>
  );
}
