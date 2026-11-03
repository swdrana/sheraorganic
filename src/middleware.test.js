import { describe, expect, it } from "vitest";
import { STAFF_ROLES, isStaffRole } from "./middleware";

describe("admin middleware staff authorization", () => {
  it("allows only the explicit staff roles", () => {
    expect(STAFF_ROLES).toEqual([
      "Admin",
      "CEO",
      "Manager",
      "Super Admin",
      "Accountant",
    ]);

    for (const role of STAFF_ROLES) {
      expect(isStaffRole(role)).toBe(true);
    }
  });

  it.each(["Customer", "Driver", "Security Guard", "Unknown", "", undefined])(
    "rejects %s",
    (role) => {
      expect(isStaffRole(role)).toBe(false);
    }
  );
});
