import Image from "next/image";
import Button from "@/components/button";
import RichTextComponent from "@/components/rich-text";
import VideoEmbed from "@/components/video-embed";
import clsx from "clsx";

import type { Page, Media } from "../../payload-types";
type ContentMediaBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "contentMedia" }
>;

export default function ContentMedia({
  block,
  showHeaderOnLeft,
  blockPosition,
}: {
  block: ContentMediaBlock;
  showHeaderOnLeft?: boolean | null;
  blockPosition: number;
}) {
  const {
    blockStyle,
    content,
    mediaType,
    media,
    videoLink,
    videoCoverImage,
    imageStyle,
    alignment,
    alignmentContentOnly,
    bgColor,
    superHeading,
    removeBottomSpace,
    cta,
  } = block;
  const image = media as Media;
  const coverImage = videoCoverImage as Media;
  const isImageLeft = alignment === "left";
  const contentIsAlignedCenter =
    alignmentContentOnly == "center" && blockStyle == "contentOnly";
  return (
    <section
      className={`w-full px-6 ${bgColor == "grayGreen" ? "bg-grayGreen" : ""} ${blockStyle == "hero" ? "bg-green-triangle" : ""} ${showHeaderOnLeft && blockPosition === 0 ? "md:pt-20" : ""}`}
    >
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row gap-6 ${removeBottomSpace && blockStyle != "hero" ? "pt-10" : "py-10"} ${
          isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
        }  ${blockStyle == "hero" ? "md:pb-20 md:items-center" : ""}`}
      >
        <div className="flex-1 md:text-left">
          <div
            className={`richtext-content ${contentIsAlignedCenter ? "text-center mx-auto max-w-2xl" : ""}`}
          >
            {superHeading && (
              <h3 className="text-base md:text-lg font-extrabold uppercase text-primary">
                {superHeading}
              </h3>
            )}
            <RichTextComponent
              content={content}
              isAlignedCenter={contentIsAlignedCenter}
            />
          </div>
          {cta?.length ? (
            <div
              className={`mt-5 flex flex-wrap gap-3 ${contentIsAlignedCenter ? "justify-center" : ""}`}
            >
              {cta.map((btn, i) => btn?.link && <Button btn={btn} key={i} />)}
            </div>
          ) : (
            ""
          )}
        </div>

        {blockStyle != "contentOnly" && mediaType == "media" && (
          <div className="flex-1">
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alt || "Content Media"}
                width={image.width || 500}
                height={image.height || 340}
                className={clsx(
                  "ml-auto md:ml-0",
                  blockStyle === "hero" ? "w-75 md:w-full" : "w-full px-5",
                  imageStyle == "card" &&
                    "max-h-70 object-cover mt-2 md:mt-0 p-3 bg-white border-3 border-lightGray rounded-xl"
                )}
              />
            )}
          </div>
        )}
        {blockStyle != "contentOnly" && mediaType == "embeddedVideo" && (
          <div className="flex-1">
            <VideoEmbed
              coverImage={coverImage.url}
              videoUrl={videoLink}
              title={coverImage.alt || "Greenvan Embedded Video"}
            />
          </div>
        )}
      </div>
    </section>
  );
}
