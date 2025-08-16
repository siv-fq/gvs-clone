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
    twoColumnsListHeading,
    twoColumnList,
    moveTwoColumnsToMedia,
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
  const towColList = twoColumnList ?? [];
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
            {twoColumnsListHeading && !moveTwoColumnsToMedia && (
              <h3 className="text-2xl mt-2 font-extrabold">
                {twoColumnsListHeading}
              </h3>
            )}
            {towColList?.length > 0 && !moveTwoColumnsToMedia && (
              <div className="mt-2 flex flex-col md:flex-row md:gap-10 text-lg text-gray-600">
                <ul className="w-auto max-w-[50%] leaf-style-list">
                  {towColList.map(
                    (item, index) =>
                      item.column1List && (
                        <li key={`col1-${index}`}>{item.column1List}</li>
                      )
                  )}
                </ul>
                <ul className="w-auto max-w-[50%] leaf-style-list">
                  {towColList.map(
                    (item, index) =>
                      item.column2List && (
                        <li key={`col2-${index}`}>{item.column2List}</li>
                      )
                  )}
                </ul>
              </div>
            )}
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

          <div className="flex-1">
            {mediaType == "media" && image?.url && (
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
            {mediaType == "embeddedVideo" && videoLink && (
              <VideoEmbed
                coverImage={coverImage.url}
                videoUrl={videoLink}
                title={coverImage.alt || "Greenvan Embedded Video"}
              />
            )}
            {mediaType == "form" && form == "contactUs" && <ContactUsForm />}
            {twoColumnsListHeading && moveTwoColumnsToMedia && (
              <h3 className="text-2xl font-extrabold mt-2">
                {twoColumnsListHeading}
              </h3>
            )}
            {towColList?.length > 0 && moveTwoColumnsToMedia && (
              <div className="mt-2 flex flex-col md:flex-row md:gap-10 text-lg text-gray-600">
                <ul className="w-auto max-w-[50%] leaf-style-list">
                  {towColList.map(
                    (item, index) =>
                      item.column1List && (
                        <li key={`col1-${index}`}>{item.column1List}</li>
                      )
                  )}
                </ul>
                <ul className="w-auto max-w-[50%] leaf-style-list">
                  {towColList.map(
                    (item, index) =>
                      item.column2List && (
                        <li key={`col2-${index}`}>{item.column2List}</li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
