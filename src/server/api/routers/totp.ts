import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const totpRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.totp.findMany();
  }),
  add: publicProcedure
    .input(
      z.object({
        issuer: z.string(),
        label: z.string(),
        algorithm: z.string(),
        digits: z.number(),
        period: z.number(),
        secret: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const totp = await ctx.prisma.totp.create({
        data: input,
      });
      return totp;
    }),
  del: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.totp.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
