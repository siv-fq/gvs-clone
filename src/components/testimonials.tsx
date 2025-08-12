import type { Page, Testimonial as TestimonialType } from "../../payload-types";
import Button from "@/components/button";
import Testimonial from "@/components/testimonial";

type TestimonialBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "testimonials" }
>;

export default function Testimonials({ block }: { block: TestimonialBlock }) {
  const {
    superHeading,
    heading,
    description,
    bgColor,
    selectedTestimonials,
    cta,
  } = block;
  return (
    <section
      className={`py-15 px-6 w-full ${bgColor == "grayGreen" ? "bg-grayGreen" : ""}`}
    >
      <div className="mx-auto max-w-5xl">
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
        <div className="overflow-x-scroll scrollbar-hide">
          <div className="mt-8  grid grid-cols-3 gap-3 w-[1024px]">
            {selectedTestimonials.map((t) => {
              const testimonial = t as TestimonialType;
              return (
                <Testimonial testimonial={testimonial} key={testimonial.id} />
              );
            })}
          </div>
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
