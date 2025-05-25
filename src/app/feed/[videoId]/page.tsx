interface PageProps {
  params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;
  return (
    <div>
      <h1>VideoId {videoId}</h1>
    </div>
  );
};

export default Page;
