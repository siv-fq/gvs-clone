import { RefreshRouteOnSave } from "@/components/payload/RefreshRouteOnSave";
import Header from "@/components/header";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/components/blocks";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ draft?: string }>;
}) {
  const { draft } = await searchParams;
  const isDraft = draft === "true";
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "home",
      },
    },
    depth: 2,
    limit: 1,
    draft: isDraft,
  });

  const page = result.docs[0];

  if (!page) return notFound();

  return (
    <>
      <Header showHeaderOnLeft={page.showHeaderOnLeft} />
      <main className={`flex flex-col row-start-2 items-center sm:items-start`}>
        {isDraft && <RefreshRouteOnSave />}
        {page.blocks?.length ? (
          <RenderBlocks
            blocks={page.blocks}
            showHeaderOnLeft={page.showHeaderOnLeft}
          />
        ) : null}
      </main>
    </>
  );
}
