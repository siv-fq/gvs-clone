import Image from "next/image";
import Button from "@/components/button";

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
    columnsPerRow,
    items,
    cta,
  } = block;
  const columnClass =
    {
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
    }[columnsPerRow] || "lg:grid-cols-4";
  return (
    <section
      className={`py-15 px-6 w-full ${bgColor == "grayGreen" ? "bg-grayGreen" : ""}`}
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
          className={`mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none ${columnClass}`}
        >
          {items.map((item, index) => {
            const media = item.image as Media;
            return (
              <div
                key={index}
                className="p-3 bg-white border-3 border-lightGray rounded-xl"
              >
                {media?.url && (
                  <Image
                    alt={media.alt ?? "Grid Image"}
                    src={media.url}
                    className="aspect-3/2 w-full rounded-xl object-cover"
                    width={400}
                    height={250}
                  />
                )}
                <h3 className="mt-3 text-lg font-extrabold tracking-tight">
                  {item.title}
                </h3>
                {item.content && (
                  <p className="text-lg text-primary font-medium">
                    {item.content}
                  </p>
                )}
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
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
