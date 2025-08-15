"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Page } from "@payload-types";
import SectionHeader from "@/components/widgets/section-header";
import clsx from "clsx";

type FaqsBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "faqs" }
>;

export default function Faq({ block }: { block: FaqsBlock }) {
  const {
    description,
    heading,
    superHeading,
    bgColor,
    removeTopSpace,
    removeBottomSpace,
    removeTopBorder,
    removeBottomBorder,
    faqs,
  } = block;

  const [openItems, setOpenItems] = useState<boolean[]>(
    Array(faqs.length).fill(false)
  );

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

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
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          heading={heading}
          superHeading={superHeading}
          description={description}
        />

        {faqs.length > 0 && (
          <dl className="mt-10 divide-y divide-gray-400">
            {faqs.map((faq, index) => {
              const isOpen = openItems[index];
              return (
                <div
                  key={index}
                  className="py-4 px-3 border-t border-lightText"
                >
                  <dt>
                    <button
                      onClick={() => toggleItem(index)}
                      className="flex w-full cursor-pointer items-start justify-between text-left"
                    >
                      <span className="text-lg leaf-style-list-item font-medium">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {isOpen ? (
                          <Minus className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </span>
                    </button>
                  </dt>

                  <dd
                    className={`transition-all ease duration-300 overflow-hidden ${
                      isOpen ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="mt-3 pr-12 text-lightText">
                      <RichText data={faq.answer} />
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>
    </section>
  );
}
