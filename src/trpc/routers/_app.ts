import { createTRPCRouter } from "../init";
import { searchRouter } from "@/modules/search/server/procedures";
import { studioRouter } from "@/modules/studio/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/procedures";
import { suggestionsRouter } from "@/modules/suggestions/server/procedures";
import { subscriptionsRouter } from "@/modules/subscriptions/server/procedures";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedures";
import { playlistsRouter } from "@/modules/playlists/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedures";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  videos: videosRouter,
  search: searchRouter,
  comments: commentsRouter,
  playlists: playlistsRouter,
  categories: categoriesRouter,
  videoViews: videoViewsRouter,
  suggestions: suggestionsRouter,
  subscriptions: subscriptionsRouter,
  videoReactions: videoReactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
