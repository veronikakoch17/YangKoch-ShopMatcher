import { mutation } from "convex/server";

// This function logs a login attempt to the database
export default mutation(async ({ db }, { email, success }) => {
    // Record the current timestamp
    const timestamp = new Date();
    
    // Insert the login attempt into the database
    await db.insert("loginAttempts", { email, success, timestamp });
    
    return true; // Indicating the log was successful
});

