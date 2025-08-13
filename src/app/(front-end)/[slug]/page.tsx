import { RefreshRouteOnSave } from "@/components/payload/RefreshRouteOnSave";
import Header from "@/components/header";
import Footer from "@/components/footer";
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

  const nav = await payload.findGlobal({
    slug: "navigation",
  });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  if (!page) return notFound();

  return (
    <>
      <Header
        showHeaderOnLeft={page.showHeaderOnLeft}
        headerLinks={nav.headerLinks || []}
        siteName={siteSettings.branding?.siteName || ""}
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
      <Footer
        footerLinks={nav.footerLinks || []}
        siteName={siteSettings.branding?.siteName || ""}
        email={siteSettings.contactUs?.email || ""}
      />
    </>
  );
}
