import { z } from "zod";
import { and, eq, gte, desc } from "drizzle-orm";

import { db } from "@/db";
import { videos, videoViews } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { DAY, MAX_VIEW_COUNT_DAILY, RANGE_BETWEEN_VIEW } from "@/constants";

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

      const now = new Date();
      const daysAgo = new Date(now.getTime() - DAY * 1000);
      const hoursAgo = new Date(now.getTime() - RANGE_BETWEEN_VIEW * 1000);

      // View cua video trong vong 24h
      const recentViews = await db
        .select()
        .from(videoViews)
        .where(
          and(
            eq(videoViews.videoId, videoId),
            eq(videoViews.userId, userId),
            gte(videoViews.createdAt, daysAgo)
          )
        )
        .orderBy(desc(videoViews.createdAt));

      // Check view gio qua
      const viewsInLastHour = recentViews.filter(
        (view) => view.createdAt >= hoursAgo
      );

      if (viewsInLastHour.length >= 3) {
        return {
          status: "not_counted",
          reason: "too_many_views_in_short_time",
        };
      }

      // Neu hom nay da xem 1 lan
      if (recentViews.length > 0) {
        const lastView = recentViews[0];
        const timeSinceLastView = now.getTime() - lastView.createdAt.getTime();

        // Lan xem cach lan xem truoc n gio
        if (
          recentViews.length < MAX_VIEW_COUNT_DAILY ||
          timeSinceLastView >= RANGE_BETWEEN_VIEW * 1000
        ) {
          // cho phep tang view
          const [createdVideoView] = await db
            .insert(videoViews)
            .values({ userId, videoId })
            .returning();

          return createdVideoView;
        } else {
          return {
            status: "not_counted",
            reason: "daily_limit_reached",
          };
        }
      }

      // Lan dau xem hom nay
      const [createdVideoView] = await db
        .insert(videoViews)
        .values({ userId, videoId })
        .returning();

      return createdVideoView;
    }),
});
