import React from "react";
import { render, screen } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import Invoice from "./Invoice";
import useOrderCode from "../dataFetching/useOrderCode";

vi.mock("../dataFetching/useOrderCode", () => ({ default: vi.fn() }));
vi.mock("../dataFetching/useSetting", () => ({
  default: () => ({ setting: {} }),
}));
vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());

describe("Invoice private lookup", () => {
  beforeEach(() => vi.resetAllMocks());

  it("passes the URL token to the order hook", () => {
    useOrderCode.mockReturnValue({ codeOrder: null, codeOrderLoading: true });
    render(<Invoice invoiceNo="12345" accessToken="private-token" />);
    expect(useOrderCode).toHaveBeenCalledWith("12345", "private-token");
    expect(screen.getByText("অর্ডারটি লোড হচ্ছে...")).toBeInTheDocument();
  });

  it("shows a Bengali message instead of crashing when access is denied", () => {
    useOrderCode.mockReturnValue({ codeOrder: null, codeOrderLoading: false });
    render(<Invoice invoiceNo="12345" accessToken="wrong-token" />);
    expect(
      screen.getByText("অর্ডারটি পাওয়া যায়নি বা দেখার অনুমতি নেই।")
    ).toBeInTheDocument();
  });
});
