import Image from "next/image";
import Button from "@/components/widgets/button";
import SectionHeader from "@/components/widgets/section-header";
import SafeHTML from "@/components/safe-html";
import clsx from "clsx";

import type { Page, Media } from "@payload-types";
type ImageGridBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "imageGrid" }
>;

export default function ImageGrid({ block }: { block: ImageGridBlock }) {
  const {
    description,
    heading,
    superHeading,
    bgColor,
    removeTopSpace,
    removeBottomSpace,
    removeTopBorder,
    removeBottomBorder,
    style,
    alignment,
    columnsPerRow,
    items,
    cta,
  } = block;

  const columnClass =
    {
      2: "sm:w-1/2",
      3: "sm:w-1/2 lg:w-1/3",
      4: "sm:w-1/2 lg:w-1/4",
      5: "sm:w-1/2 lg:w-1/5",
    }[columnsPerRow] || "sm:w-1/2 lg:w-1/4";

  return (
    <section
      className={clsx(
        "py-20 px-6 w-full",
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

        <div
          className={clsx(
            "flex flex-wrap gap-y-5 mx-auto max-w-2xl",
            alignment == "center" && "justify-center",
            style != "icon" && "lg:max-w-none",
            style == "icon" && "lg:max-w-4xl"
          )}
        >
          {items.map((item, index) => {
            const media = item.image as Media;
            const content = item?.content || "";
            return (
              <div
                className={clsx(
                  "sm:px-2",
                  style == "icon" ? "w-1/2" : "w-full",
                  columnClass
                )}
                key={index}
              >
                <div
                  className={clsx(
                    "p-3",
                    style == "card" &&
                      "bg-white border-3 border-lightGray rounded-xl"
                  )}
                >
                  {media?.url && (
                    <Image
                      alt={media.alt ?? "Grid Image"}
                      src={media.url}
                      className={clsx(
                        "object-cover",
                        style == "card"
                          ? "rounded-xl w-full aspect-3/2 object-cover"
                          : "max-h-[160px] w-auto",
                        alignment == "center" && "mx-auto"
                      )}
                      width={400}
                      height={250}
                    />
                  )}
                  <h3
                    className={clsx(
                      "mt-3 text-xl font-extrabold tracking-tight",
                      alignment == "center" && "text-center",
                      style == "card" && "md:text-xl"
                    )}
                  >
                    {item.title}
                  </h3>
                  {content != "" ? (
                    <div
                      className={clsx(
                        "text-lg  font-medium",
                        alignment == "center" && "text-center",
                        style == "card" && "text-primary",
                        style == "normal" && "text-lightText"
                      )}
                    >
                      <SafeHTML html={content} />
                    </div>
                  ) : (
                    <div className="text-lg font-medium">&nbsp;</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {cta?.length ? (
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {cta.map((btn, i) =>
              btn?.link ? (
                <Button btn={btn} key={i} />
              ) : btn?.text ? (
                <p key={i} className="text-lg">
                  {btn.text}
                </p>
              ) : null
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
