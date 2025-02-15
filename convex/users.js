import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if user already exists
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        // If user does not exist, insert new user
        if (!user.length) {
            const result = await ctx.db.insert("users", {
                email: args.email,
                picture: args.picture,
                name: args.name,
                credits: 3,
            });

            return result; // Ensure newly created user is returned
        }

        return user[0]; // Return existing user
    },
});
