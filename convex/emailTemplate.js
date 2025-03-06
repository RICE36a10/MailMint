import {mutation} from "./_generated/server";
import {v} from "convex/values";

export const SaveTemplate = mutation({
    args:{
        tid:v.string(),
        design:v.any(),
        email:v.string(),
    },
    handler:async (ctx, args) => {
        try {
            return await ctx.db.insert('emailTemplates', {
                tid: args?.tid,
                design: args?.design,
                email: args?.email,
            });
        } catch (e) {
            console.log(e)
        }
    }
})
