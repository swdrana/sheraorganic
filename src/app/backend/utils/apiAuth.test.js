import { describe, expect, it } from "vitest";
import { STAFF_ROLES, isStaff } from "./apiAuth";

const allowedRoles = ["Admin", "CEO", "Manager", "Super Admin", "Accountant"];
const deniedRoles = ["Customer", "Driver", "Security Guard", "Unknown", "", undefined];

describe("API staff authorization", () => {
  it("uses the explicit staff role allow-list", () => {
    expect(STAFF_ROLES).toEqual(allowedRoles);
    for (const role of allowedRoles) {
      expect(isStaff({ user: { role } })).toBe(true);
    }
  });

  it("rejects non-staff and unknown roles", () => {
    for (const role of deniedRoles) {
      expect(isStaff({ user: { role } })).toBe(false);
    }
    expect(isStaff(null)).toBe(false);
  });
});
