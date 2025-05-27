"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Nam" });
  return <div>Page client say: {data.greeting}</div>;
};
