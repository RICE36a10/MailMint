import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const SaveTemplate = mutation({
    args: {
        tid: v.string(),
        design: v.any(),
        email: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            return await ctx.db.insert("emailTemplates", {
                tid: args?.tid,
                design: args?.design,
                email: args?.email,
                description: args?.description,
            });
        } catch (e) {
            console.log(e);
        }
    },
});

export const GetTemplateDesign = query({
    args: {
        email: v.string(),
        tid: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const result = await ctx.db
                .query("emailTemplates")
                .filter((q) =>
                    q.and(q.eq(q.field("tid"),args?.tid),
                    q.eq(q.field("email"), args?.email))
                )
                .collect();
            return result[0] || {};
        } catch (e) {
            console.log("etem");
            console.log(e);
            return {};
        }
    },
});

export const UpdateTemplateDesign  = mutation({
    args: {
        tid:v.string(),
        design:v.any(),
    },
    handler: async (ctx, args) => {
        // get doc id
        const result = await ctx.db.query('emailTemplates')
            .filter(q=>q.eq(q.field("tid"),args?.tid)).collect();

        console.log("i am in UpdateTemplateDesign this is full result", result);
        const docID = result[0]._id;
        console.log(docID);
        // update that docId
        await ctx.db.patch(docID,{
            design: args?.design,
        })
    }
})


export const GetAllUserTemplate = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("emailTemplates") // ✅ Ensure correct collection name
            .filter(q => q.eq(q.field("email"), args.email))
            .collect();
    }
});
