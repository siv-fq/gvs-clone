import type { Page, Testimonial as TestimonialType } from "@payload-types";
import Button from "@/components/widgets/button";
import SectionHeader from "@/components/widgets/section-header";
import Testimonial from "@/components/widgets/testimonial";
import clsx from "clsx";

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
    removeTopSpace,
    removeBottomSpace,
    removeTopBorder,
    removeBottomBorder,
    selectedTestimonials,
    cta,
  } = block;
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
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          heading={heading}
          superHeading={superHeading}
          description={description}
        />
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
