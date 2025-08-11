import Image from "next/image";
import Button from "@/components/button";
import clsx from "clsx";

import type { Page, Media } from "../../payload-types";
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
        "py-15 px-6 w-full",
        bgColor == "grayGreen" && "bg-grayGreen"
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
            <h2 className="text-3xl font-bold lg:text-4xl">{heading}</h2>
          )}
          {description && (
            <p className="mt-3 text-lg md:text-xl text-gray-600">
              {description}
            </p>
          )}
        </div>

        <div
          className={clsx(
            "mt-8 flex flex-wrap gap-y-5 mx-auto max-w-2xl",
            alignment == "center" && "justify-center",
            style != "icon" && "lg:max-w-none",
            style == "icon" && "lg:max-w-4xl"
          )}
        >
          {items.map((item, index) => {
            const media = item.image as Media;
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
                        "w-auto object-cover",
                        style == "card"
                          ? "rounded-xl  aspect-3/2 object-cover"
                          : "max-h-[160px]",
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
                  {item.content && (
                    <p
                      className={clsx(
                        "text-lg  font-medium",
                        alignment == "center" && "text-center",
                        style == "card" && "text-primary",
                        style == "normal" && "text-lightText"
                      )}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
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
