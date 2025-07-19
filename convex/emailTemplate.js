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
                tid: args.tid,
                design: args.design,
                email: args.email,
                description: args.description,
            });
        } catch (e) {
            console.error(e);
            return null;
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
                    q.and(
                        q.eq(q.field("tid"), args.tid),
                        q.eq(q.field("email"), args.email)
                    )
                )
                .collect();
            if (result.length === 0) {
                return {};
            }
            return result[0];
        } catch (e) {
            console.error("GetTemplateDesign error", e);
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
        const result = await ctx.db
            .query("emailTemplates")
            .filter(q => q.eq(q.field("tid"), args.tid))
            .collect();

        if (!result.length) {
            throw new Error("Template not found");
        }

        const docID = result[0]._id;
        await ctx.db.patch(docID, {
            design: args.design,
        });
    }
})


export const GetAllUserTemplate = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            return await ctx.db
                .query("emailTemplates")
                .filter(q => q.eq(q.field("email"), args.email))
                .collect();
        } catch (e) {
            console.error("GetAllUserTemplate error", e);
            return [];
        }
    }
});


export const DeleteTemplate = mutation({
    args: { tid: v.string() },
    handler: async (ctx, { tid }) => {
        try {
            const result = await ctx.db
                .query("emailTemplates")
                .filter(q => q.eq(q.field("tid"), tid))
                .collect();

            if (!result.length) {
                throw new Error("Template not found");
            }

            const docId = result[0]._id;

            await ctx.db.delete(docId);
            return { success: true, message: "Template deleted successfully" };
        } catch (error) {
            console.error("Error deleting template:", error);
            throw new Error("Failed to delete template");
        }
    },
});


