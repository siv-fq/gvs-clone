import { RefreshRouteOnSave } from "@/components/payload/RefreshRouteOnSave";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/components/blocks";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function LandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draft?: string }>;
}) {
  const { slug } = await params;
  const { draft } = await searchParams;
  const isDraft = draft === "true";
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
    draft: isDraft,
  });

  const page = result.docs[0];

  if (!page) return notFound();

  return (
    <div className="">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {isDraft && <RefreshRouteOnSave />}
        {page.blocks?.length ? <RenderBlocks blocks={page.blocks} /> : null}
      </main>
    </div>
  );
}
