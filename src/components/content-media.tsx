import Image from "next/image";
import Button from "@/components/button";
import RichText from "@/components/rich-text";

import type { Page, Media } from "../../payload-types";
type ContentMediaBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "contentMedia" }
>;

export default function ContentMedia({ block }: { block: ContentMediaBlock }) {
  const { content, media, alignment, superHeading, cta } = block;
  const image = media as Media;
  const isImageLeft = alignment === "left";

  return (
    <section className="w-full p-8     bg-green-triangle">
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-6 ${
          isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
        }  md:py-20 `}
      >
        <div className="flex-1 md:text-left">
          <div className="prose richtext-content">
            <h3 className="text-base md:text-lg font-extrabold uppercase text-primary">
              {superHeading}
            </h3>
            {/* <RichText content={content} /> */}
            <h2 className=" text-3xl md:text-4xl font-extrabold mb-2">
              Fast, Affordable, and Eco-Friendly Waste Removal Services
            </h2>
            <p className="text-lg mb-2 text-lightText">
              From single-item pickups to large-scale removals, we handle it all
              with professionalism and care. Let us help you keep your space
              clean and clutter-free!
            </p>
            <ul className="leaf-style-list mb-4 text-lg text-lightText">
              <li className="mb-1">Available 7 days a week</li>
              <li className="mb-1">Reliable, insured, and efficient staff</li>
              <li className="mb-1">Book easily via WhatsApp</li>
              <li className="mb-1">Eco-Friendly Disposal</li>
            </ul>
          </div>
          {cta?.length && (
            <div className="mt-6 flex flex-wrap gap-3">
              {cta.map((btn, i) => btn?.link && <Button btn={btn} key={i} />)}
            </div>
          )}
        </div>

        <div className="flex-1">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt || "Content Media"}
              width={image.width || 500}
              height={image.height || 340}
              className="ml-auto w-75 md:ml-0 md:w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
