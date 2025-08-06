"use client";
import type { Page } from "../../payload-types";
import ContentMedia from "@/components/content-media";
import Faq from "@/components/faq";
import ImageGrid from "@/components/image-grid";

export function RenderBlocks({
  blocks,
}: {
  blocks: NonNullable<Page["blocks"]>;
}) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "contentMedia":
            return <ContentMedia block={block} key={index} />;
          case "imageGrid":
            return <ImageGrid block={block} key={index} />;
          case "faqs":
            return <Faq block={block} key={index} />;
          default:
            return <div key={index}>Unknown block type: {block.blockType}</div>;
        }
      })}
    </>
  );
}
