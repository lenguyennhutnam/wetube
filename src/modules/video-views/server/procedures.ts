import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { videos, videoViews } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videoViewsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ videoId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { videoId } = input;
      const { id: userId } = ctx.user;

      const [video] = await db
        .select()
        .from(videos)
        .where(eq(videos.id, videoId));

      if (!video || video.userId === userId) {
        return {
          status: "not_counted",
          reason: "owner_viewing_own_video",
        };
      }

      const [existingVideoView] = await db
        .select()
        .from(videoViews)
        .where(
          and(eq(videoViews.videoId, videoId), eq(videoViews.userId, userId))
        );

      if (existingVideoView) {
        return existingVideoView;
      }

      const [createdVideoView] = await db
        .insert(videoViews)
        .values({ userId, videoId })
        .returning();

      return createdVideoView;
    }),
});
