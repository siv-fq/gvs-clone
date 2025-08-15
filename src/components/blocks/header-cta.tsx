import type { Page, Media } from "@payload-types";
import Image from "next/image";
import clsx from "clsx";
import Button from "@/components/widgets/button";
import SectionHeader from "@/components/widgets/section-header";

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
    removeTopSpace,
    removeBottomSpace,
    removeTopBorder,
    removeBottomBorder,
  } = block;
  const image = media as Media;
  return (
    <section
      className={clsx(
        "px-6 w-full",
        bgColor === "grayGreen" && [
          "bg-grayGreen border-lightGray",
          !removeTopBorder && !removeBottomBorder && "border-y",
          removeTopBorder && !removeBottomBorder && "border-b",
          !removeTopBorder && removeBottomBorder && "border-t",
        ],
        !removeTopSpace && !removeBottomSpace && "py-20",
        removeTopSpace && !removeBottomSpace && "pb-20",
        !removeTopSpace && removeBottomSpace && "pt-20"
      )}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          heading={heading}
          superHeading={superHeading}
          description={description}
        />
        {cta?.length ? (
          <div className="flex flex-wrap gap-3 justify-center">
            {cta.map((btn, i) => btn?.link && <Button btn={btn} key={i} />)}
          </div>
        ) : (
          ""
        )}
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
