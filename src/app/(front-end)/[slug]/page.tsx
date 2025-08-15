import { RefreshRouteOnSave } from "@/components/payload/refresh-route-on-save";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
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
  const [{ slug }, { draft }] = await Promise.all([params, searchParams]);
  const isDraft = draft === "true";

  const payload = await getPayload({ config });
  const [result, nav] = await Promise.all([
    payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
      draft: isDraft,
    }),
    payload.findGlobal({ slug: "navigation" }),
  ]);

  const page = result.docs[0];

  if (!page) return notFound();

  return (
    <>
      <Header
        showHeaderOnLeft={page.showHeaderOnLeft}
        headerLinks={nav.headerLinks || []}
      />
      <main className={`flex flex-col row-start-2 items-center sm:items-start`}>
        {isDraft && <RefreshRouteOnSave />}
        {page.blocks?.length ? (
          <RenderBlocks
            blocks={page.blocks}
            showHeaderOnLeft={page.showHeaderOnLeft}
          />
        ) : null}
      </main>
      <Footer footerLinks={nav.footerLinks || []} />
    </>
  );
}
