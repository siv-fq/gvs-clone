"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { BlockContent } from "../../payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default function Faq({ block }: { block: BlockContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (block.blockType !== "faq") return null;
  return (
    <div id="faq" className="pt-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold lg:text-3xl">
          {block.title || "Frequently Asked Questions"}
        </h2>
        {block.description && (
          <p className="mt-3 text-lg text-gray-600">{block.description}</p>
        )}
        <dl className="mt-10 divide-y divide-gray-400">
          {block.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-4">
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-start justify-between text-left"
                  >
                    <span className="text-lg font-semibold text-white">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {isOpen ? (
                        <ChevronUp className="size-6 text-white" />
                      ) : (
                        <ChevronDown className="size-6 text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="mt-3 pr-12 text-base text-white">
                    <RichText data={faq.answer} />
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
