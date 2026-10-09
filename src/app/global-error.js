"use client"; // Error components must be Client Components

import { useEffect } from "react";

// Replaces the root layout when it crashes, so it must render its own <html>/<body>.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "48px 16px" }}>
        <h2>কিছু একটা সমস্যা হয়েছে।</h2>
        <p>পেজটি আবার লোড করে দেখুন।</p>
        <button type="button" onClick={() => reset()} style={{ marginRight: 8 }}>
          আবার চেষ্টা করুন
        </button>
        <button type="button" onClick={() => window.location.reload()}>
          পেজ রিলোড
        </button>
      </body>
    </html>
  );
}
