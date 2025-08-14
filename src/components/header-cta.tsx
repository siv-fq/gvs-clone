import type { Page, Media } from "@payload-types";
import Image from "next/image";
import clsx from "clsx";
import Button from "@/components/button";

type HeaderCtaBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "headerCta" }
>;

export default function HeaderCta({ block }: { block: HeaderCtaBlock }) {
  const {
    heading,
    superHeading,
    bgColor,
    description,
    media,
    cta,
    removeBottomSpace,
    removeBottomBorder,
  } = block;
  const image = media as Media;
  return (
    <section
      className={clsx(
        "px-6 w-full",
        removeBottomSpace ? "pt-20" : "py-20",
        bgColor === "grayGreen" &&
          `bg-grayGreen border-lightGray ${removeBottomBorder ? "border-t" : "border-y"}`
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-intro max-w-2xl mx-auto text-center">
          {superHeading && (
            <h3 className="text-base md:text-lg font-extrabold uppercase text-primary">
              {superHeading}
            </h3>
          )}
          {heading && (
            <h2 className="text-3xl font-extrabold lg:text-4xl">{heading}</h2>
          )}
          {description && (
            <p className="mt-3 text-lg md:text-xl text-gray-600">
              {description}
            </p>
          )}
          {cta?.length ? (
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              {cta.map((btn, i) => btn?.link && <Button btn={btn} key={i} />)}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex-1 mt-5">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt || "Content Media"}
              width={image.width || 500}
              height={image.height || 340}
              className="w-[95%] md:w-3/4 mx-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
}
