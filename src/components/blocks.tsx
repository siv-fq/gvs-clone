import type { Page } from "@payload-types";
import ContentMedia from "@/components/blocks/content-media";
import Faq from "@/components/blocks/faq";
import TOC from "@/components/blocks/toc";
import ImageGrid from "@/components/blocks/image-grid";
import Testimonials from "@/components/blocks/testimonials";
import HeaderCta from "@/components/blocks/header-cta";
import RichText from "@/components/blocks/rich-text";

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
          case "richText":
            return <RichText content={block.content} key={index} />;
          default:
            return <div key={index}>Unknown block type</div>;
        }
      })}
    </>
  );
}
