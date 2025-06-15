import { DEFAULT_LIMIT } from "@/constants";
import { SearchView } from "@/modules/search/ui/views/search-view";
import { trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    query: string | undefined;
    categoryId: string | undefined;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { query, categoryId } = await searchParams;

  const safeDecodeQuery = (q: string | undefined) => {
    if (!q) return undefined;
    try {
      // Nếu đã decode rồi thì return luôn, nếu chưa thì decode
      return q.includes("%") ? decodeURIComponent(q) : q;
    } catch {
      return q; // Fallback nếu decode fail
    }
  };

  const cleanQuery = safeDecodeQuery(query);

  void trpc.categories.getMany.prefetch();
  void trpc.search.getMany.prefetchInfinite({
    query,
    categoryId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <div>
      <SearchView query={cleanQuery} categoryId={categoryId} />
    </div>
  );
};

export default Page;
