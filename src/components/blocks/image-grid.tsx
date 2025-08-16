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
            const content = item?.content || "";
            const media = item.media;
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
                  {Array.isArray(media) && media.length > 0 && (
                    <div className="flex">
                      {media.map((image, index) => {
                        const img = image as Media;
                        return (
                          img?.url && (
                            <div
                              className={clsx(
                                "relative",
                                style !== "icon" && "flex-1"
                              )}
                              key={img.id || index}
                            >
                              <Image
                                alt={img.alt ?? "Grid Image"}
                                src={img.url}
                                className={clsx(
                                  index > 0 && "pl-2",
                                  style === "icon" && media.length > 1
                                    ? "max-w-25 object-contain"
                                    : "object-cover",
                                  style === "card"
                                    ? "rounded-xl w-full aspect-3/2"
                                    : "max-h-[160px] w-auto",
                                  alignment === "center" && "mx-auto"
                                )}
                                width={400}
                                height={250}
                              />
                            </div>
                          )
                        );
                      })}
                    </div>
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
                        "pt-2 text-lg text-lightText font-medium",
                        alignment == "center" && "text-center",
                        style == "card" && "text-primary"
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
