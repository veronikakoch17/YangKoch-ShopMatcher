// convex/login.js
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async ({ db }, { email, password }) => {
    // Query for user information
    const user = await db.table("users").filter(q => q.eq("email", email)).first();

    // Placeholder for actual password verification
    // In a real application, you should hash the password and compare hashes
    if (user && user.password === password) {
      return { status: "success", user: user };
    } else {
      return { status: "failed" };
    }
  },
});
