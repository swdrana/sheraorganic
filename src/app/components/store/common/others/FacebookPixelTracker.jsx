"use client";
import { useEffect } from "react";
import { PageView } from "../../../../utilities/facebookPixel";

export default function FacebookPixelTracker() {
  useEffect(() => {
    PageView();
  }, []);
  return null;
}
