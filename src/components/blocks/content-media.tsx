import Image from "next/image";
import type {
  Page,
  Media,
  Testimonial as TestimonialType,
} from "@payload-types";
import clsx from "clsx";
import Button from "@/components/widgets/button";
import SectionHeader from "@/components/widgets/section-header";
import RichTextComponent from "@/components/widgets/rich-text";
import VideoEmbed from "@/components/widgets/video-embed";
import Testimonial from "@/components/widgets/testimonial";
import ContactUsForm from "@/components/widgets/contact-us-form";
import "@style/content-media.css";

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
    contentPosition,
    bgColor,
    heading,
    superHeading,
    description,
    eyebrowHeading,
    cta,
    removeTopSpace,
    removeBottomSpace,
    removeTopBorder,
    removeBottomBorder,
    selectedTestimonials,
    form,
  } = block;
  const image = media as Media;
  const coverImage = videoCoverImage as Media;
  const isImageLeft = contentPosition === "left";
  const testimonial = selectedTestimonials as TestimonialType;
  return (
    <section
      className={clsx(
        "w-full px-6",
        bgColor === "grayGreen" && "bg-grayGreen border-lightGray",
        bgColor === "grayGreen" &&
          ((!removeTopBorder && !removeBottomBorder && "border-y") ||
            (removeTopBorder && !removeBottomBorder && "border-b") ||
            (!removeTopBorder && removeBottomBorder && "border-t")),
        blockStyle == "hero" && "bg-green-triangle md:pb-10 ",
        showHeaderOnLeft && blockPosition === 0 && "md:pt-10"
      )}
    >
      <div
        className={clsx(
          imageStyle == "card"
            ? `${removeBottomSpace && removeTopSpace ? "" : removeBottomSpace ? "pt-10 md:pt-12" : removeTopSpace ? "pb-10 md:pb-12" : "pt-10 md:pt-12 pb-20"}`
            : "py-20"
        )}
      >
        <SectionHeader
          heading={heading}
          superHeading={superHeading}
          description={description}
        />

        <div
          className={clsx(
            "max-w-6xl mx-auto flex flex-col gap-6",
            isImageLeft ? "md:flex-row" : "md:flex-row-reverse",
            blockStyle == "hero" && "md:items-center"
          )}
        >
          <div className="flex-1 md:text-left">
            <div className="richtext-content">
              {superHeading && (
                <h3 className="text-base md:text-lg font-extrabold uppercase text-primary">
                  {eyebrowHeading}
                </h3>
              )}
              <div className="text-lg text-lightText">
                <RichTextComponent content={content} />
              </div>
            </div>
            {cta?.length ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {cta.map((btn, i) => btn?.link && <Button btn={btn} key={i} />)}
              </div>
            ) : (
              ""
            )}
            {testimonial && (
              <div className="w-full flex mt-3 justify-end">
                <Testimonial testimonial={testimonial} />
              </div>
            )}
          </div>

          {mediaType == "media" && (
            <div className="flex-1">
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt || "Content Media"}
                  width={image.width || 500}
                  height={image.height || 340}
                  className={clsx(
                    "ml-auto md:ml-0",
                    blockStyle == "hero" ? "w-75 md:w-full" : "w-full",
                    imageStyle == "card" &&
                      "max-h-70 object-cover mt-2 md:mt-0 p-3 bg-white border-3 border-lightGray rounded-xl",
                    imageStyle == "normal" && "px-5"
                  )}
                />
              )}
            </div>
          )}
          {mediaType == "embeddedVideo" && videoLink && (
            <div className="flex-1">
              <VideoEmbed
                coverImage={coverImage.url}
                videoUrl={videoLink}
                title={coverImage.alt || "Greenvan Embedded Video"}
              />
            </div>
          )}
          {mediaType == "form" && form == "contactUs" && (
            <div className="flex-1">
              <ContactUsForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
