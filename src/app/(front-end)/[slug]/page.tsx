import type { Metadata } from "next";
import type { Media } from "@payload-types";
import { RefreshRouteOnSave } from "@/components/payload/refresh-route-on-save";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/components/blocks";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamicParams = true;
export const revalidate = false;

async function fetchPage(slug: string, draft: boolean) {
  const payload = await getPayload({ config });

  const pageRes = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft,
  });

  return { page: pageRes?.docs?.[0], payload };
}

export default async function LandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draft?: string }>;
}) {
  const [{ slug }, { draft }] = await Promise.all([params, searchParams]);
  const isDraft = draft === "true";

  const { page, payload } = await fetchPage(slug, isDraft);
  if (!page) return notFound();

  const nav = await payload.findGlobal({ slug: "navigation" });

  return (
    <>
      <Header
        showHeaderOnLeft={page.showHeaderOnLeft}
        headerLinks={nav.headerLinks || []}
      />
      <main className="flex flex-col row-start-2 items-center sm:items-start">
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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draft?: string }>;
}): Promise<Metadata | undefined> {
  const [{ slug }, { draft }] = await Promise.all([params, searchParams]);
  const isDraft = draft === "true";

  const { page } = await fetchPage(slug, isDraft);
  if (!page) return undefined;

  const ogImage = page.featuredImage as Media;

  return {
    metadataBase: new URL(process.env.BLOB_BASE_URL!),
    title: page.title,
    ...(page.metaDescription && {
      description: page.metaDescription,
    }),
    ...(ogImage?.url && {
      openGraph: {
        images: [ogImage.url],
      },
    }),
  };
}
