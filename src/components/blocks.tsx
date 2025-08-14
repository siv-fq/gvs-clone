import type { Page } from "@payload-types";
import ContentMedia from "@/components/content-media";
import Faq from "@/components/faq";
import TOC from "@/components/toc";
import ImageGrid from "@/components/image-grid";
import Testimonials from "@/components/testimonials";
import HeaderCta from "@/components/header-cta";

export function RenderBlocks({
  blocks,
  showHeaderOnLeft,
}: {
  blocks: NonNullable<Page["blocks"]>;
  showHeaderOnLeft?: boolean | null;
}) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "contentMedia":
            return (
              <ContentMedia
                block={block}
                key={index}
                blockPosition={index}
                showHeaderOnLeft={showHeaderOnLeft}
              />
            );
          case "imageGrid":
            return <ImageGrid block={block} key={index} />;
          case "faqs":
            return <Faq block={block} key={index} />;
          case "testimonials":
            return <Testimonials block={block} key={index} />;
          case "tocWithContent":
            return <TOC block={block} key={index} />;
          case "headerCta":
            return <HeaderCta block={block} key={index} />;
          default:
            return <div key={index}>Unknown block type: {block.blockType}</div>;
        }
      })}
    </>
  );
}
